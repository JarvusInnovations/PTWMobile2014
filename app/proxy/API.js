Ext.define('PTWMobile2014.proxy.API', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.api',
	requires: [
		'PTWMobile2014.API'
	],

	config: {
		pageParam: 'page',
		limitParam: false,
		startParam: false,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},

	getUrl: function() {
		var url = this.callParent(arguments);
		return PTWMobile2014.API.buildUrl(url);
	},

	getParams: function(operation) {
		var params = this.callParent(arguments);
		return PTWMobile2014.API.buildParams(params);
	}
});