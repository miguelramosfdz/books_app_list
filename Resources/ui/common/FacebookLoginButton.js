var FacebookLoginButton = function(params) {
	
	Ti.Facebook.appid = Ti.App.Config.facebook.appId;
	Ti.Facebook.permissions = ['user_about_me'];
	
	var loginButton = Ti.UI.createButton(params);
	
	loginButton.addEventListener('click', function(){
	    if ( Ti.Facebook.loggedIn ) {
	        Ti.Facebook.logout();
	    } else {
	        Ti.Facebook.authorize();
	    }
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
	                Ti.API.info(obj);
	                Ti.App.provider = 'facebook';
	                Ti.App.uid = obj.id;             
	                alert("uid: " + Ti.App.uid);
	            }
	        }
	    );
	});
	
	Ti.Facebook.addEventListener('logout', function() {
        Ti.App.provider = '';
        Ti.App.uid = '';
	});

	return loginButton;
	//var button = Ti.Facebook.createLoginButton();
};


module.exports = FacebookLoginButton;
