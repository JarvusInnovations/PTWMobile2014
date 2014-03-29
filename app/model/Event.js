Ext.define('PTWMobile2014.model.Event', {
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'ID',
		fields: [{
			name: 'ID',
			type: 'integer'
		}, {
			name: 'Handle',
			type: 'string'
		}, {
			name: 'Status',
			type: 'string'
		}, {
		    name: 'EventPhotoID',
		    type: 'integer'
        }, {
			name: 'Title',
			type: 'string'
		}, {
			name: 'StartTime',
			type: 'date',
			dateFormat: 'timestamp'
		}, {
			name: 'StartDate',
			convert: function(v,r) {
				return Ext.util.Format.date(r.get('StartTime'), 'l, F j');
			}
		}, {
			name: 'EndTime',
			type: 'date',
			dateFormat: 'timestamp'
		}, {
		}, {
		    name: 'LocationName',
		    type: 'string'
        }, {
			name: 'LocationAddress',
			type: 'string'
		}, {
			name: 'Description',
			type: 'string'
		}, {
			name: 'City',
			type: 'string'
		}, {
			name: 'State',
			type: 'string'
		}, {
			name: 'isBookmark',
			type: 'boolean',
			defaultValue: false
		}, {
			name: 'Description',
			type: 'string'
		}, {
			name: 'RegisterURL',
			type: 'string'
		}, {
			name: 'FacebookURL',
			type: 'string'
		}, {
			name: 'TwitterURL',
			type: 'string'
		}, {
			name: 'WebsiteURL',
			type: 'string'
		}]
	},

	toUrl: function() {
		return ['events', this.getId()];
	}
});