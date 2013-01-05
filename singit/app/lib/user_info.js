var exports = exports || this;

var Alloy = require('alloy'), _ = require("alloy/underscore")._;
var PREFIX = "userinfo";
var LOGIN_EXPIRE_TIME = 60 * 60 * 24;

/**
 * ログイン情報取得 キー指定
 *  
 * @param string キー名
 * @return string 
 */
exports.get = function(key) {
    return Ti.App.Properties.getString(PREFIX + "-" + key);
};

/**
 * ログイン情報更新 キー指定
 *  
 * @param string キー名
 * @param string 値 
 */
exports.set = function(key, value) {
    Ti.App.Properties.setString(PREFIX + "-" + key, value);
};


/**
 * ログイン情報保存
 *  
 * @param object
 */
exports.setAll = function(list) {
    var self = this;

    list.timestamp = parseInt((new Date)/1000);
    _.each(_.pairs(list), function(row) {
        row[1] = (row[1] != null) ? String(row[1]) : null;
        self.set(row[0], row[1]);
    });
    
};

/**
 * ログインしているか
 * expireチェックあり
 *  
 * @return bool true:ログイン済
 */
exports.isLogin = function() {
    var uid = this.get("uid");
    var timestamp = this.get("timestamp");
    var now = parseInt((new Date)/1000);
    var expire = LOGIN_EXPIRE_TIME;

    return (uid != null && (now - timestamp) < expire);
};

/**
 * ログインフォームの表示
 */
exports.showLoginForm = function() {
    var controller = Alloy.createController('login');
    controller.win.open();
};

/**
 * ログアウト状態にする
 */
exports.logout = function() {
    this.set('uid', null);
};


exports.getImageUrl = function() {
    var provider = this.get('provider');
    var uid      = this.get('uid');
    var url;

    if (provider == 'twitter') {
        url = "http://api.twitter.com/1/users/profile_image?id=" + uid;
    } else if (provider == 'facebook') {
        url = "https://graph.facebook.com/" + uid +"/picture";
    }

    Ti.API.debug(url);
    return url;
};
