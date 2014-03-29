/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'PTWMobile2014',

    controllers: [
        'Schedule'
    ],

    requires: [
        'Jarvus.touch.override.app.EncodedPaths',
        'Jarvus.touch.override.app.PushPath',
        'Ext.MessageBox'
    ],

    views: [
        'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Fix for an issue on iOS 7.1 when minimal-ui is enabled and phone is in landscape,
        // where the viewport is moved up in certain situations, see below.
        // Sencha bug thread: http://www.sencha.com/forum/showthread.php?282632-2.3.1a-quot-minimal-ui-quot-breaks-viewport-position-on-iOS-7.1-when-rotated-to-landscape&p=1033589
        
            if (Ext.os.is.iOS && Ext.os.version.gtEq('7')) {
                // Fix viewport position after orientation change
                // Applying to all orientation changes just to be sure and since it has low overhead,
                // but would theoretically only be needed for landscape
                Ext.Viewport.on('orientationchange', function () {
                    this.scrollToTop();
                });
            
                // Fix viewport position after field blur and keyboard is hidden when phone is in landscape
                // CAUTION: The 'control' method is a private method of Ext.app.Application
                this.control({
                    'field': {
                        blur: function () {
                            if (Ext.Viewport.getOrientation() == 'landscape') {
                                Ext.Viewport.scrollToTop();
                            }
                        }
                    }
                });
            }
        // end fix
    },
    
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
