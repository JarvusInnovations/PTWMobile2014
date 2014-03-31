Ext.define('PTWMobile2014.controller.Schedule', {
	extend: 'Ext.app.Controller',
	requires: ['PTWMobile2014.API', 'Ext.SegmentedButton'],

	config: {
		calendarUpdateFrequency: window.calendarUpdateFrequency || 1, // # of seconds until cached calendar considered old
		views: ['Main', 'Event'],
		stores: ['Schedule', 'Bookmarks'],
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
			},
			loginMessage: 'mainview #loginMessage',
			segmentedButton: 'mainview segmentedbutton',
			showAllButton: 'button[action=show-all]',
			showBookmarksButton: 'button[action=show-bookmarks]'
		},
		control: {
			eventList: {
				activate: 'onEventListActivate',
				select: 'onScheduleListSelect'
			},
			showAllButton: {
				tap: 'onShowAllButtonTap'
			},
			showBookmarksButton: {
				tap: 'onShowBookmarksButtonTap'
			},
		},
		routes: {
			'bookmarks': 'showBookmarks',
			'events': 'showEvents',
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

	loadBookmarks: function(callback, scope) {
		var me = this,
			mainView = me.getMainView();
			bookmarkStore = Ext.getStore('Bookmarks');

		mainView.setMasked({
			xtype: 'loadmask',
			message: 'Loading&hellip;'
		});

		PTWMobile2014.API.loadBookmarks(function(option, success, response) {
			if(success) {
				me.getEventList().show();
				me.getLoginMessage().hide();

				bookmarkStore.setData(response.data.data);
			}
			else if(response.data.loginRequired) {
				me.getEventList().hide();
				me.getLoginMessage().show();
			}
			mainView.setMasked(false);

			if (callback) {
				callback.call(scope);
			}
		});
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

	showEvents: function() {
		var me = this;

		Ext.getStore('Schedule').clearFilter();
		me.getSegmentedButton().setPressedButtons([me.getShowAllButton()]);
		me.pushPath('events');
		me.getLoginMessage().hide();
		me.syncSchedule();
	},

	showEvent: function(eventId) {
		var mainView = this.getMainView(),
			eventView = this.getEventView(),
			scheduleStore = Ext.getStore('Schedule'),
			eventRecord;

		eventRecord = scheduleStore.getData().getByKey(eventId);

		eventView.setEvent(eventRecord);

		mainView.push(eventView);
	},

	onShowAllButtonTap: function() {
		this.pushPath('events');
		this.getEventList().show();
		this.getLoginMessage().hide();
		Ext.getStore('Schedule').clearFilter();
	},

	onShowBookmarksButtonTap: function() {
		this.showBookmarks();
	},

	showBookmarks: function() {
		var me = this,
			bookmarkStore = Ext.getStore('Bookmarks');

		me.getSegmentedButton().setPressedButtons([me.getShowBookmarksButton()]);

		me.pushPath('bookmarks');

		if(!bookmarkStore.isLoaded()) {
			me.loadBookmarks(function() { me.filterSchedule() });
		}
		else {
			me.filterSchedule();
		}
	},

	filterSchedule: function() {
		var bookmarkStore = Ext.getStore('Bookmarks'),
			scheduleStore = Ext.getStore('Schedule');

		if(bookmarkStore.isLoaded() && scheduleStore.isLoaded()) {
			scheduleStore.filter({
				filterFn: function(item) {
					return bookmarkStore.getById(item.get("Id")) != null;
				}
			});
		}
	}
});