var dropdown =   require('./dropdown');
var keyboard =   require('./keyboard');
var navigation = require('./navigation');
var sidebar =    require('./sidebar');
var toolbar =    require('./toolbar');
var sina = require('./sina.js');

var gitbook = window.gitbook;

function init() {

    sidebar.init();

    // Init keyboard
    keyboard.init();
    
    // Bind dropdown
    dropdown.init();

    // Init navigation
    navigation.init();
	
	// Init Sina Event
	sina.init();


    // Add action to toggle sidebar
    toolbar.createButton({
        index: 0,
        icon: 'fa fa-align-justify',
        onClick: function(e) {
            e.preventDefault();
            sidebar.toggle();
        }
    });
}

gitbook.events.on('start', init);

gitbook.keyboard = keyboard;
gitbook.navigation = navigation;
gitbook.sidebar = sidebar;
gitbook.toolbar = toolbar;
