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

		title: 'Details',
		cls: 'event-details',
		scrollable: true,
		styleHtmlContent: true,
		itemId: 'EventInfoPanel',
		tpl: [
		    '<header class="event-header"',
                '<tpl if="EventPhotoID"> style="background-image:url(http://phillytechweek.com/thumbnail/{EventPhotoID}/600x600)"</tpl>',
                '>',
    
                '<div class="event-header-info">',
                    '<div class="event-date">',
                        '{[Ext.Date.format(values.StartTime, "l, F j")]}',
                    '</div>',
                    '<h1 class="event-title">{Title}</h1>',
                '</div>',    
            '</header>',
            
            '<div class="event-datetime">',
            
                '<div class="event-time">',
                    '{[this.getShortTime(values.StartTime)]}',
                    '<tpl if="StartTime != EndTime">',
                        '&ndash;',
                        '{[this.getShortTime(values.EndTime)]}',
                    '</tpl>',
                '</div>',
            
            '</div>',

            '<div class="event-location">',
                '<tpl if="LocationName">{LocationName}</tpl>',
                '<tpl if="LocationName && LocationAddress">, </tpl>',
                '<tpl if="LocationAddress">{LocationAddress}</tpl>',
            '</div>',
            
            '<div class="event-description">{Description}</div>',
            
            {
                getShortTime: function(time) {
                    var hour = parseInt(Ext.Date.format(time, 'g')),
                        min  = parseInt(Ext.Date.format(time, 'i')),
                        ampm = Ext.Date.format(time, 'a');

                    if (min > 9) {
                        min = ':' + min;
                    } else if (min > 0) {
                        min = ':0' + min;
                    }

                    return hour + min + ampm;
                }
            }
		]
/*
		tpl: [
            '	<h1 class="title">{Title}</h1>', 
            '	<tpl if="Address"><p class="address">{Address}</p></tpl>', 
            '	<p class="dates">', 
            	'<time>{[Ext.DateExtras.getShortMonthName(values.StartTime.getMonth())]} {[values.StartTime.getDate()]} - {[Ext.DateExtras.getShortMonthName(values.EndTime.getMonth())]} {[values.EndTime.getDate()]}, {[values.StartTime.getFullYear()]}</time>', '<br>', '<time>{StartDate:date("g:i A")} to {EndTime:date("g:i A")}</time>', '	</p>', 
            	'	<tpl if="Description"><div class="description"><p>{[values.Description.replace(/[\\r\\n]+/g, \'</p><p>\')]}</p></div></tpl>', 
            	'	<ul class="event-links">', 
            	'		<tpl if="Address"    ><li><a href="http://maps.google.com/?q={Address}" target="_system" class="wtf">Directions</a></li></tpl>',
            	'		<tpl if="RegisterURL"><li><a href="{RegisterURL}" target="_blank">Register</a></li></tpl>',
            	'		<tpl if="TwitterURL" ><li><a href="{TwitterURL}"  target="_system">Twitter</a></li></tpl>', 
            	'		<tpl if="FacebookURL"><li><a href="{FacebookURL}" target="_blank">Facebook</a></li></tpl>', 
            	'		<tpl if="WebsiteURL" ><li><a href="{WebsiteURL}"  target="_blank">Website</a></li></tpl>', 
            	'	</ul>', 
		]
*/
	},

	updateEvent: function(newEvent, oldEvent) {
		var eventData = newEvent.getData()

		if (newEvent) {
			if(markdown && markdown.toHTML) {
				eventData.Description = markdown.toHTML(eventData.Description);
			}
			this.setData(eventData);
			Jarvus.util.ExternalBrowser.patchTargets(this.getInnerHtmlElement());
		}
	}
});