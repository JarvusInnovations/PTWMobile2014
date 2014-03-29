Ext.define('PTWMobile2014.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',
    requires: [
        'Ext.dataview.List'
    ],

    config: {

        layout: {
            animation: {
                duration: 200
            }
        },
        items: [{
            title: '#ptw14 Schedule',
            cls: 'schedule-list',

            xtype: 'list',
            store: 'Schedule',
            grouped: true,
            itemTpl: [
                '<div class="event-time">',
                    '{[this.getShortTime(values.StartTime)]}',
                    '<tpl if="StartTime != EndTime">',
                        '&ndash;',
                        '{[this.getShortTime(values.EndTime)]}',
                    '</tpl>',
                '</div>',
                '<h1 class="event-title">{Title}</h1>', 
                '<div class="event-location">',
                    '<tpl if="LocationName">{LocationName}</tpl>',
                    '<tpl if="LocationName && LocationAddress">, </tpl>',
                    '<tpl if="LocationAddress">{LocationAddress}</tpl>',
                '</div>',
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
        }]
    }
});