Ext.define('PTWMobile2014.controller.Schedule', {
	extend: 'Ext.app.Controller',
	requires: ['PTWMobile2014.API'],

	config: {
		calendarUpdateFrequency: window.calendarUpdateFrequency || 1, // # of seconds until cached calendar considered old
		views: ['Main', 'Event'],
		stores: ['Schedule'],
		refs: {
			mainView: {
				selector: 'mainview',
				autoCreate: true,

				xtype: 'mainview'
			},
			eventList: 'mainview list',
			eventView: {
				selector: 'eventview',
				autoCreate: true,

				xtype: 'eventview'
			}
		},
		control: {
			eventList: {
				activate: 'onEventListActivate',
				select: 'onScheduleListSelect'
			}
		},
		routes: {
			'events/:eventId': {
				action: 'showEvent',
				conditions: {
					':eventId': '.+'
				}
			}
		}
	},

	launch: function() {
		var mainView = this.getMainView();

		Ext.Viewport.add(mainView);

		this.syncSchedule();

		// relay navigation to clicky
		if (Ext.feature.has.History && window.clicky) {
			window.addEventListener('hashchange', function(ev) {
				clicky.log(ev.newURL, null, 'pageview');
			});
		}
	},

	syncSchedule: function(forceUpdate) {
		var me = this,
			scheduleStore = Ext.getStore('Schedule'),
			lastSync = localStorage.getItem('lastSync'),
			cachedSchedule = localStorage.getItem('schedule'),
			now = Date.now() / 1000;

		if (cachedSchedule) {
			if (!scheduleStore.isLoaded() && (cachedSchedule = Ext.decode(cachedSchedule, true))) {
				scheduleStore.setData(cachedSchedule);
				scheduleStore.loaded = true;
			}

			if (forceUpdate || !lastSync || now - parseInt(lastSync) > me.getCalendarUpdateFrequency()) {
				me.loadSchedule();
			}
		} else {
			me.loadSchedule();
		}
	},

	loadSchedule: function() {
		var mainView = this.getMainView(),
			scheduleStore = Ext.getStore('Schedule'),
			lastSync = localStorage.getItem('lastSync'),
			i = 0,
			data, record;

		mainView.setMasked({
			xtype: 'loadmask',
			message: 'Loading&hellip;'
		});

		PTWMobile2014.API.loadSchedule(lastSync, function(options, success, response) {
			if (success) {
				data = response.data.data;
				if (data.length > 0) {
					for (; i < data.length; i++) {
						if (record = scheduleStore.getById(data[i].ID)) {
							record.raw = data[i];
							record.setData(data[i]);
							record.setDirty();
						} else {
							scheduleStore.addData(data[i]);
						}
						scheduleStore.sync();
					}

					// store response in cache
					localStorage.setItem('schedule', Ext.encode(scheduleStore.getRange().map(function(v) {
						return v.raw;
					})));
				}
				localStorage.setItem('lastSync', Math.round(Date.now() / 1000));
			}
			mainView.setMasked(false);
		});
	},

	onEventListActivate: function() {
		this.pushPath('');
		this.getEventList().deselectAll()
	},

	onScheduleListSelect: function(list, record) {
		this.redirectTo(record);
	},

	showEvent: function(eventId) {
		var mainView = this.getMainView(),
			eventView = this.getEventView(),
			scheduleStore = Ext.getStore('Schedule'),
			eventRecord;

		eventRecord = scheduleStore.getData().getByKey(eventId);

		eventView.setEvent(eventRecord);

		mainView.push(eventView);
	}
});