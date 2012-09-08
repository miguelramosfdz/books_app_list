var Setting = function() {
	
	
	var AppWindow = require('ui/common/AppWindow');
	var FacebookLoginButton = require('ui/common/FacebookLoginButton');
	var TwitterLoginButton = require('ui/common/TwitterLoginButton');
	
	var win = new AppWindow('設定', false); 
	
	var view = Ti.UI.createView({
		layout: 'vertical',
		width: '100%',
	});
	
	var name = Ti.App.Properties.getString('name');
	var provider =  Ti.App.Properties.getString('provider');
	var uid = Ti.App.Properties.getString('uid');
	
	var facebookLoginButton = new FacebookLoginButton({	
		title: (provider == 'facebook') ? 'Facebookでログイン済み' : 'Facebookでログインする',
    	top: 20,
    	height: 40,
    	width: '80%',
    	color: '#333',
    });

	var twitterLoginButton = new TwitterLoginButton({	
		title: (provider == 'twitter') ? 'Twitterでログイン済み' : 'Twitterでログインする',
    	top: 20,
    	height: 40,
    	width: '80%',
    	color: '#333',
    });
    
    facebookLoginButton.addEventListener('success', function() {
    	this.title = 'Facebookでログイン済み';
    	twitterLoginButton.title = 'Twitterでログインする';
    	alert('ログインしました ' + Ti.App.Properties.getString('uid'));
    });
    
    twitterLoginButton.addEventListener('success', function() {
    	this.title = 'Twitterでログイン済み';
    	facebookLoginButton.title = 'Facebookでログインする';
    	alert('ログインしました ' + Ti.App.Properties.getString('uid'));
    });
	
	view.add(facebookLoginButton);
	view.add(twitterLoginButton);

	win.add(view);
	return win;
};


module.exports = Setting;