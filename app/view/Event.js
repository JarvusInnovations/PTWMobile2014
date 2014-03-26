Ext.define('PTWMobile2014.view.Event', {
	extend: 'Ext.Container',
	xtype: 'eventview',
	requires: [
        'Jarvus.util.ExternalBrowser'
    ],
	// mixins: [
	// 	'Jarvus.ux.Pressable'
	// ],

	config: {
		event: null,

		// pressable config
		pressedTarget: '.event-links a',

		title: 'Event',
		scrollable: true,
		styleHtmlContent: true,
		styleHtmlContent: true,
		itemId: 'EventInfoPanel',
		tpl: [
			'<div class="eventInfo">',
			 '	<h1 class="title">{Title}</h1>', 
			 '	<tpl if="Address"><p class="address">{Address}</p></tpl>', 
			 '	<p class="dates">', 
			 	'<time>{[Ext.DateExtras.getShortMonthName(values.StartTime.getMonth())]} {[values.StartTime.getDate()]} - {[Ext.DateExtras.getShortMonthName(values.EndTime.getMonth())]} {[values.EndTime.getDate()]}, {[values.StartTime.getFullYear()]}</time>', '<br>', '<time>{StartDate:date("g:i A")} to {EndTime:date("g:i A")}</time>', '	</p>', '	<tpl if="Description"><div class="description"><p>{[values.Description.replace(/[\\r\\n]+/g, \'</p><p>\')]}</p></div></tpl>', 
			 	'	<ul class="event-links">', 
			 	'		<tpl if="Address"    ><li><a href="http://maps.google.com/?q={Address}" target="_system" class="wtf">Directions</a></li></tpl>',
			 	'		<tpl if="RegisterURL"><li><a href="{RegisterURL}" target="_blank">Register</a></li></tpl>',
			 	'		<tpl if="TwitterURL" ><li><a href="{TwitterURL}"  target="_system">Twitter</a></li></tpl>', 
			 	'		<tpl if="FacebookURL"><li><a href="{FacebookURL}" target="_blank">Facebook</a></li></tpl>', 
			 	'		<tpl if="WebsiteURL" ><li><a href="{WebsiteURL}"  target="_blank">Website</a></li></tpl>', 
			 	'	</ul>', 
		 	'</div>'
		]
	},

	updateEvent: function(newEvent, oldEvent) {
		if (newEvent) {
			this.setData(newEvent.getData());
			Jarvus.util.ExternalBrowser.patchTargets(this.getInnerHtmlElement());
		}
	}
});