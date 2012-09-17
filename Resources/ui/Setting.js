var Setting = function() {

	var AppWindow = require('ui/common/AppWindow');
	var FacebookLoginButton = require('ui/common/FacebookLoginButton');
	var TwitterLoginButton = require('ui/common/TwitterLoginButton');
    var createToolbar   = require('ui/common/toolbar');
	
	var win = new AppWindow('設定', false); 
	
	var view = Ti.UI.createView({
		layout: 'vertical',
		width: '100%',
	});
	
    // 戻るボタン
    var closeBtn = Titanium.UI.createButton({
        title:'戻る',
        style:Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    closeBtn.addEventListener('click', function(e) {
        win.close();
    });
    var toolBarTitle = '設定';
    var barTitle = Ti.UI.createLabel({
        textAlign:1,  //0:左揃え、 1:中央揃え、2：右揃え
        text:toolBarTitle,
        width:160,
        color:'#FFF',
        font:{ fontSize:14 }
    });
    toolBar = new createToolbar(closeBtn,'','', '', barTitle);

	// ユーザデータをローカルから取得
	var name = Ti.App.Properties.getString('name');
	var provider = Ti.App.Properties.getString('provider');
	var uid = Ti.App.Properties.getString('uid');
	
	// Facebookログインボタン
	var facebookLoginButton = new FacebookLoginButton({	
		title: (provider == 'facebook') ? 'Facebookでログイン済み' : 'Facebookでログインする',
    	top: 60,
    	height: 40,
    	width: '80%',
    	color: '#333',
    });

	// Twitterログインボタン
	var twitterLoginButton = new TwitterLoginButton({	
		title: (provider == 'twitter') ? 'Twitterでログイン済み' : 'Twitterでログインする',
    	top: 80,
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
	
    view.add(toolBar);
	view.add(facebookLoginButton);
	view.add(twitterLoginButton);

	win.add(view);
	return win;
};


module.exports = Setting;
