Ext.define('PTWMobile2014.store.Schedule', {
	extend: 'Ext.data.Store',
	requires: [
		'PTWMobile2014.model.Event'
	],

	config: {
		model: 'PTWMobile2014.model.Event',
		grouper: {
            groupFn: function(record) {
                return record.get('StartDate');
            },
            sortProperty: 'StartTime'
        },
		sorters: [{
			property: 'StartTime',
			direction: 'ASC'
		}]
	}
});