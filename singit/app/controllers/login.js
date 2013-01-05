function closeWindow() {
    $.win.close();
}

var userInfo = require('user_info');

var twitter = require('twitter').Twitter({
    consumerKey: Alloy.CFG.oauth.twitter.key,
    consumerSecret: Alloy.CFG.oauth.twitter.secret,
    accessTokenKey: userInfo.get('key'),
    accessTokenSecret: userInfo.get('secret'),
    windowTitle: 'Twitter認証'
});

Ti.Facebook.appid = Alloy.CFG.oauth.facebook.appid;
Ti.Facebook.permissions = ['user_about_me'];

twitter.addEventListener('login', function(e) {

    if (e.success) {
        $.win.trigger('success', {provider: 'twitter', data: {
            name: e['screen_name'], 
            uid: e['user_id'],
            key: e.accessTokenKey,
            secret: e.accessTokenSecret
        }});
    } else {
        alert(e.error);
    }
});

$.twitter.loginBtn.on('click', function(e) {
    twitter.logout(function(){});
    twitter.authorize();
});
  
$.facebook.loginBtn.on("click", function() {
    Ti.Facebook.logout();
    Ti.Facebook.authorize();
});
  
// ログイン完了後はユーザ情報を取得
Ti.Facebook.addEventListener('login', function() {
    Ti.Facebook.requestWithGraphPath('me', {}, "GET", function(e) {
            if (e.success) {
                var obj = JSON.parse(e.result);
                Ti.API.debug(obj);
                $.win.trigger('success', {provider: 'facebook', data: {name: obj.name, uid: obj.id} });
            }   
        }   
    );  
});

/**
 * ソーシャルログイン完了後 DB登録処理開始
 */
$.win.on('success', function(e) {

    var user = Alloy.createModel('user', { 
        provider: e.provider,
        uid: e.data.uid,
        name: e.data.name
    });

    user.save(null, { 
        success: function(model, data) { 
            userInfo.setAll(data);
            $.win.close();
        },
        error: function() { alert("error"); }
    });
});
