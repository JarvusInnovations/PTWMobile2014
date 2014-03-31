Ext.define('PTWMobile2014.store.Bookmarks', {
	extend: 'Ext.data.Store',
	requires: [
		'PTWMobile2014.model.Bookmark'
	],

	config: {
		model: 'PTWMobile2014.model.Bookmark'
	}
});