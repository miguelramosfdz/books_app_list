var exports = exports || this, Alloy = require("alloy"), _ = require("alloy/underscore")._, PREFIX = "userinfo", LOGIN_EXPIRE_TIME = 86400;

exports.get = function(key) {
    return Ti.App.Properties.getString(PREFIX + "-" + key);
};

exports.set = function(key, value) {
    Ti.App.Properties.setString(PREFIX + "-" + key, value);
};

exports.setAll = function(list) {
    var self = this;
    list.timestamp = parseInt(new Date / 1000);
    _.each(_.pairs(list), function(row) {
        row[1] = row[1] != null ? String(row[1]) : null;
        self.set(row[0], row[1]);
    });
};

exports.isLogin = function() {
    var uid = this.get("uid"), timestamp = this.get("timestamp"), now = parseInt(new Date / 1000), expire = LOGIN_EXPIRE_TIME;
    return uid != null && now - timestamp < expire;
};

exports.showLoginForm = function() {
    var controller = Alloy.createController("login");
    controller.win.open();
};

exports.logout = function() {
    this.set("uid", null);
};

exports.getImageUrl = function() {
    var provider = this.get("provider"), uid = this.get("uid"), url;
    provider == "twitter" ? url = "http://api.twitter.com/1/users/profile_image?id=" + uid : provider == "facebook" && (url = "https://graph.facebook.com/" + uid + "/picture");
    Ti.API.debug(url);
    return url;
};