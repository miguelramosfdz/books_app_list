function Controller() {
    function closeWindow() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        barColor: "black",
        id: "win",
        modal: "true"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.cancelBtn = A$(Ti.UI.createButton({
        id: "cancelBtn",
        title: "キャンセル"
    }), "Button", null);
    closeWindow ? $.__views.cancelBtn.on("click", closeWindow) : __defers["$.__views.cancelBtn!click!closeWindow"] = !0;
    $.__views.win.leftNavButton = $.__views.cancelBtn;
    $.__views.__alloyId6 = A$(Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId6"
    }), "View", $.__views.win);
    $.__views.win.add($.__views.__alloyId6);
    $.__views.__alloyId7 = A$(Ti.UI.createLabel({
        top: "30",
        text: "利用規約に同意してログイン",
        id: "__alloyId7"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = A$(Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId8"
    }), "View", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.__alloyId8);
    $.__views.twitter = Alloy.createWidget("jp.singit.login.twitter", "widget", {
        id: "twitter"
    });
    $.__views.twitter.setParent($.__views.__alloyId8);
    $.__views.facebook = Alloy.createWidget("jp.singit.login.facebook", "widget", {
        id: "facebook"
    });
    $.__views.facebook.setParent($.__views.__alloyId8);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userInfo = require("user_info"), twitter = require("twitter").Twitter({
        consumerKey: Alloy.CFG.oauth.twitter.key,
        consumerSecret: Alloy.CFG.oauth.twitter.secret,
        accessTokenKey: userInfo.get("key"),
        accessTokenSecret: userInfo.get("secret"),
        windowTitle: "Twitter認証"
    });
    Ti.Facebook.appid = Alloy.CFG.oauth.facebook.appid;
    Ti.Facebook.permissions = [ "user_about_me" ];
    twitter.addEventListener("login", function(e) {
        e.success ? $.win.trigger("success", {
            provider: "twitter",
            data: {
                name: e.screen_name,
                uid: e.user_id,
                key: e.accessTokenKey,
                secret: e.accessTokenSecret
            }
        }) : alert(e.error);
    });
    $.twitter.loginBtn.on("click", function(e) {
        twitter.logout(function() {});
        twitter.authorize();
    });
    $.facebook.loginBtn.on("click", function() {
        Ti.Facebook.logout();
        Ti.Facebook.authorize();
    });
    Ti.Facebook.addEventListener("login", function() {
        Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
            if (e.success) {
                var obj = JSON.parse(e.result);
                Ti.API.debug(obj);
                $.win.trigger("success", {
                    provider: "facebook",
                    data: {
                        name: obj.name,
                        uid: obj.id
                    }
                });
            }
        });
    });
    $.win.on("success", function(e) {
        var user = Alloy.createModel("user", {
            provider: e.provider,
            uid: e.data.uid,
            name: e.data.name
        });
        user.save(null, {
            success: function(model, data) {
                userInfo.setAll(data);
                $.win.close();
            },
            error: function() {
                alert("error");
            }
        });
    });
    __defers["$.__views.cancelBtn!click!closeWindow"] && $.__views.cancelBtn.on("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;