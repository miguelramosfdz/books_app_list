var Setting = function() {

	var AppWindow = require('ui/common/AppWindow');
	var FacebookLoginButton = require('ui/common/FacebookLoginButton');
	var TwitterLoginButton = require('ui/common/TwitterLoginButton');
	
	var win = new AppWindow('設定', false); 
	
	var view = Ti.UI.createView({
		layout: 'vertical',
		width: '100%',
	});
	
	// ユーザデータをローカルから取得
	var name = Ti.App.Properties.getString('name');
	var provider = Ti.App.Properties.getString('provider');
	var uid = Ti.App.Properties.getString('uid');
	
	// Facebookログインボタン
	var facebookLoginButton = new FacebookLoginButton({	
		title: (provider == 'facebook') ? 'Facebookでログイン済み' : 'Facebookでログインする',
    	top: 20,
    	height: 40,
    	width: '80%',
    	color: '#333',
    });

	// Twitterログインボタン
	var twitterLoginButton = new TwitterLoginButton({	
		title: (provider == 'twitter') ? 'Twitterでログイン済み' : 'Twitterでログインする',
    	top: 20,
    	height: 40,
    	width: '80%',
    	color: '#333',
    });
    
    // ユーザ登録APIのリクエスト
    var createUserInfo = function(successFunc) {
	    var util = require('lib/util');
	    var auth = require('lib/Auth');

    	var url = util.createUrl('setting');

    	var params = {
    		'uid': Ti.App.Properties.getString('uid'),
    		'provider': Ti.App.Properties.getString('provider'),
    		'name': Ti.App.Properties.getString('name'),
    	};

    	var client = Ti.Network.createHTTPClient({
		    onload : function(e) {
		        Ti.API.debug("Received text: " + this.responseText);
		        successFunc();
		    },
		    onerror : function(e) {
		        Ti.API.debug(e);
		        Ti.UI.createAlertDialog({
		            title:'ログイン失敗しました',
		            message: '時間をおいて試してください',
		            buttonName:['OK']
		        }).show();
		    },
		    timeout : 5000  // in milliseconds
		});
		client.open("POST", url);
		client.setRequestHeader('Content-type','application/json; charset=utf-8');
        var authStr = Auth.makeAuthStr();
		client.setRequestHeader('Authorization',authStr);

		client.send(params);
    };
    
    // Facebook OAuthが成功した場合のイベントハンドラー
    facebookLoginButton.addEventListener('success', function() {
   		createUserInfo(function() {
   			facebookLoginButton.title = 'Facebookでログイン済み';
    		twitterLoginButton.title = 'Twitterでログインする';
    		
    		Ti.UI.createAlertDialog({
	            title:'ログイン完了しました',
	            buttonName:['OK']
	        }).show();
   		});
    });
    
    // Twitter OAuthが成功した場合のイベントハンドラー
    twitterLoginButton.addEventListener('success', function() {
    	createUserInfo(function() {
    		twitterLoginButton.title = 'Twitterでログイン済み';
    		facebookLoginButton.title = 'Facebookでログインする';
    		
    		Ti.UI.createAlertDialog({
	            title:'ログイン完了しました',
	            buttonName:['OK']
	        }).show();
    	});
    });
	
	view.add(facebookLoginButton);
	view.add(twitterLoginButton);

	win.add(view);
	return win;
};


module.exports = Setting;
