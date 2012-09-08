var TwitterLoginButton = function(params) {
	
	var twitter = require('lib/twitter').Twitter({
		consumerKey: Ti.App.Config.twitter.consumerKey,
		consumerSecret: Ti.App.Config.twitter.consumerSecret,
		accessTokenKey: '',//Ti.App.Properties.getString('twitterAccessTokenKey'),
		accessTokenSecret: '',//Ti.App.Properties.getString('twitterAccessTokenSecret')
	});
	
	var loginButton = Ti.UI.createButton(params);

	twitter.addEventListener('login', function(e) {
      if (e.success) {
        Ti.API.info(e);
        Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
        Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);
        Ti.App.Properties.setString('provider', 'twitter');
        
      } else {
        alert(e.error);
      }
    });
    
    loginButton.addEventListener('click', function(e) {
    	twitter.authorize();
    });
    
    return loginButton;

};

module.exports = TwitterLoginButton;
