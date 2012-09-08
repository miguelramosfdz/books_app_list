var ActiveWinTab = {};

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	Ti.App.Config = require("config");
    tabsReq = require('ui/common/AppTabGroup');
    ActiveWinTab.tabs = new tabsReq;
    ActiveWinTab.tabs.open();

})();
