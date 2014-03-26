Ext.define('PTWMobile2014.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',
    requires: [
        'Ext.dataview.List'
    ],

    config: {

        items: [{
            title: 'Schedule',

            xtype: 'list',
            store: 'Schedule',
            grouped: true,
            itemTpl: [
                '<div class="calendar">', 
                    '<h1 class="event-title">{Title}</h1>', 
                    '<p>{Address}</p>', 
                    '<time><span class="day">{[Ext.Date.format(values.StartTime, "D, M j")]}, </span>{[Ext.Date.format(values.StartTime, "g:i A")]} to {[Ext.Date.format(values.EndTime, "g:i A")]}</time>',
                '</div>'
            ]
        }]
    }
});