Ext.define('PTWMobile2014.API', {
	extend: 'Ext.util.Observable',
	singleton: true,
	requires: [
		'Ext.Ajax'
	],

	config: {
		baseUrl: 'http://ptw2014.clients01.jarv.us/'
	},

	constructor: function() {
		this.callParent(arguments);

		Ext.Ajax.on('requestexception', this.onRequestException, this);
	},

	buildUrl: function(path) {
		return this.getBaseUrl() + path;
	},

	buildParams: function(params) {
		params = params || {};
		return params;
	},

	request: function(method, path, params, callback, scope) {
		Ext.Ajax.request({
			url: this.buildUrl(path),
			method: method,
			params: this.buildParams(params),
			scope: this,
			callback: function(options, success, response) {
				try {
					if (response.getResponseHeader('content-type').indexOf('application/json') == 0 && response.responseText) {
						response.data = Ext.decode(response.responseText, true);
					}
				} catch (error) {}

				Ext.callback(callback, scope, [options, success, response]);
			}
		});
	},

	onRequestException: function(connection, response, options) {
		var me = this;

		Ext.Viewport.setMasked(false);

		if (response.status == 500) {
			Ext.Msg.alert('Server Error', 'An error has occured, please try again later.');
		}
	}
});