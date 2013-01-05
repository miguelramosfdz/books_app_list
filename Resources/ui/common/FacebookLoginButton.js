var FacebookLoginButton = function(params) {
	
	Ti.Facebook.appid = Ti.App.Config.facebook.appId;
	Ti.Facebook.permissions = ['user_about_me'];
	
	var loginButton = Ti.UI.createButton(params);
	
	loginButton.addEventListener('click', function(){
        Ti.Facebook.logout();
        Ti.Facebook.authorize();
	});
	
	// ログイン完了後はユーザ情報を取得
	Ti.Facebook.addEventListener('login', function() {
		Ti.Facebook.requestWithGraphPath(
	        'me',
	        {},
	        "GET",
	        function(e) {
	            if (e.success) {
	                var obj = JSON.parse(e.result);
	                //Ti.API.info(obj);
	                Ti.App.Properties.setString('provider', 'facebook');
		            Ti.App.Properties.setString('name', obj.name);
		            Ti.App.Properties.setString('uid', obj.id);
		            loginButton.fireEvent('success');
	            }
	        }
	    );
	});
	
	Ti.Facebook.addEventListener('logout', function() {
        
	});

	return loginButton;
	//var button = Ti.Facebook.createLoginButton();
};


module.exports = FacebookLoginButton;
