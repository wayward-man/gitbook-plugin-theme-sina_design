var dropdown =   require('./dropdown');
var keyboard =   require('./keyboard');
var navigation = require('./navigation');
var sidebar =    require('./sidebar');
var toolbar =    require('./toolbar');

var gitbook = window.gitbook;

function init() {
	
    // Init sidebar
    sidebar.init();
    console.log('sidebar.inited');

    // Init keyboard
    keyboard.init();
    console.log('keyboard.inited');
    
    // Bind dropdown
    dropdown.init();
    console.log('dropdown.inited');

    // Init navigation
    navigation.init();
    console.log('navigation.inited');

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
