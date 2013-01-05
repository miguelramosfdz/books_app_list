function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        layout: "vertical",
        modal: "true"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.titleLbl = A$(Ti.UI.createLabel({
        font: {
            fontSize: 25,
            fontWeight: "bold"
        },
        top: 60,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "歌ってみろ",
        id: "titleLbl"
    }), "Label", $.__views.win);
    $.__views.win.add($.__views.titleLbl);
    $.__views.view = A$(Ti.UI.createView({
        top: 60,
        left: 20,
        right: 20,
        layout: "horizontal",
        id: "view"
    }), "View", $.__views.win);
    $.__views.win.add($.__views.view);
    $.__views.singBtn = A$(Ti.UI.createButton({
        width: 130,
        right: 10,
        title: "歌う",
        id: "singBtn"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.singBtn);
    $.__views.listenBtn = A$(Ti.UI.createButton({
        width: 130,
        right: 10,
        title: "聴く",
        id: "listenBtn"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.listenBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userInfo = require("user_info");
    $.win.on("focus", function() {});
    $.singBtn.on("click", function() {
        if (!userInfo.isLogin()) userInfo.showLoginForm(); else {
            var controller = Alloy.createController("sing").getView();
            Alloy.Globals.parent.add(controller);
        }
    });
    $.listenBtn.on("click", function() {
        var controller = Alloy.createController("ranking/ranking").getView();
        Alloy.Globals.parent.add(controller);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;