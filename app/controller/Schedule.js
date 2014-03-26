Ext.define('PTWMobile2014.controller.Schedule', {
	extend: 'Ext.app.Controller',	

	config: {
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
		var mainView = this.getMainView(),
			scheduleStore = Ext.getStore('Schedule');

		Ext.Viewport.add(mainView);

		// relay navigation to clicky
		if (Ext.feature.has.History && window.clicky) {
			window.addEventListener('hashchange', function(ev) {
				clicky.log(ev.newURL, null, 'pageview');
			});
		}

		scheduleStore.load();
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