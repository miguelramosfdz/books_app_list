var Setting = function() {
	
	
	var AppWindow = require('ui/common/AppWindow');
	var win = new AppWindow('設定', false); 
	
	var view = Ti.UI.createView({
		layout: 'vertical'
	});
	
	var FacebookLoginButton = require('ui/common/FacebookLoginButton');
	var facebookLoginButton = new FacebookLoginButton({	
		title: 'facebook login',
    	top: 50,
    	left: 100,
    	height: 50,
    	width: Ti.UI.SIZE
    });
	
	var TwitterLoginButton = require('ui/common/TwitterLoginButton');
	var twitterLoginButton = new TwitterLoginButton({	
		title: 'twitter login',
    	top: 50,
    	left: 100,
    	height: 50,
    	width: Ti.UI.SIZE
    });
	
	view.add(facebookLoginButton);
	view.add(twitterLoginButton);
	
	win.add(view);
	return win;
};


module.exports = Setting;