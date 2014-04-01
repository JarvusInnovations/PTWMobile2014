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
            xtype: 'container',
            cls: 'main-view',
            layout: 'vbox',
            title: 'Schedule',
            items: [{
                xtype: 'segmentedbutton',
                cls: 'schedule-switcher',
                defaults: {
                    flex: 1
                },
                items: [{
                    text: 'All Events',
                    pressed: true,
                    action: 'show-all'
                }, {
                    text: 'Bookmarked',
                    action: 'show-bookmarks'
                }],
            }, {
                title: '#ptw14 Schedule',
                cls: 'schedule-list',

                xtype: 'list',
                store: 'Schedule',
                grouped: true,
                flex: 1,
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
            }, {
                xtype: 'container',
                cls: 'login-message',
                itemId: 'loginMessage',
                flex: 1,
                hidden: true,
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [{
                    styleHtmlContent: true,
                    html: 'Please log in to view your bookmarks.'
                },{
                    xtype: 'button',
                    itemId: 'loginButton',
                    text: 'Log In',
                    handler: function() {
                        location.href = PTWCONFIG.hostName + 'login?return=/#bookmarks';
                    }
                }]
            }]
        }]
    }
});