var TwitterLoginButton = function(params) {
	
	var twitter = require('lib/twitter').Twitter({
		consumerKey: Ti.App.Config.twitter.consumerKey,
		consumerSecret: Ti.App.Config.twitter.consumerSecret,
		accessTokenKey: Ti.App.Properties.getString('twitterAccessTokenKey'),
		accessTokenSecret: Ti.App.Properties.getString('twitterAccessTokenSecret'),
		windowTitle: 'Twitter認証'
	});
	
	var loginButton = Ti.UI.createButton(params);

	twitter.addEventListener('login', function(e) {
		
        if (e.success) {
            Ti.API.info(e);
            Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
            Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);
            Ti.App.Properties.setString('provider', 'twitter');
            Ti.App.Properties.setString('name', e['screen_name']);
            Ti.App.Properties.setString('uid', e['user_id']);
            
            loginButton.fireEvent('success');
        } else {
            alert(e.error);
        }
    });
    
    loginButton.addEventListener('click', function(e) {
    	twitter.logout(function(){});
    	twitter.authorize();
    });
    
    return loginButton;

};

module.exports = TwitterLoginButton;
