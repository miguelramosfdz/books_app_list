function Controller() {
    function save() {
        var user = Alloy.createModel("user", {
            id: userInfo.get("id"),
            name: $.name.value,
            description: $.description.value,
            homepage: $.homepage.value,
            like_music: $.likeMusic.value
        });
        user.save(null, {
            success: function(model, data) {
                userInfo.setAll(data);
                alert("更新しました");
            },
            error: function() {
                alert("失敗しました");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "設定",
        modal: "true"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.saveBtn = A$(Ti.UI.createButton({
        id: "saveBtn",
        title: "登録"
    }), "Button", null);
    save ? $.__views.saveBtn.on("click", save) : __defers["$.__views.saveBtn!click!save"] = !0;
    $.__views.win.rightNavButton = $.__views.saveBtn;
    $.__views.wrapper = A$(Ti.UI.createScrollView({
        layout: "vertical",
        top: "15dp",
        left: "15dp",
        right: "15dp",
        width: Ti.UI.FILL,
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: !0,
        showHorizontalScrollIndicator: !1,
        id: "wrapper"
    }), "ScrollView", $.__views.win);
    $.__views.win.add($.__views.wrapper);
    $.__views.headerView = A$(Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "headerView"
    }), "View", $.__views.wrapper);
    $.__views.wrapper.add($.__views.headerView);
    $.__views.image = A$(Ti.UI.createImageView({
        top: 0,
        left: 0,
        width: "50dp",
        height: "50dp",
        borderWidth: 2,
        borderColor: "black",
        id: "image"
    }), "ImageView", $.__views.headerView);
    $.__views.headerView.add($.__views.image);
    $.__views.headerRightView = A$(Ti.UI.createView({
        layout: "vertical",
        top: 0,
        left: "10dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "headerRightView"
    }), "View", $.__views.headerView);
    $.__views.headerView.add($.__views.headerRightView);
    $.__views.__alloyId13 = A$(Ti.UI.createLabel({
        left: 0,
        top: "10dp",
        width: Ti.UI.SIZE,
        font: {
            fontSize: 13
        },
        text: "■ ニックネーム（20文字以内）",
        id: "__alloyId13"
    }), "Label", $.__views.headerRightView);
    $.__views.headerRightView.add($.__views.__alloyId13);
    $.__views.__alloyId14 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderWidth: 2,
        borderColor: "black",
        id: "__alloyId14"
    }), "View", $.__views.headerRightView);
    $.__views.headerRightView.add($.__views.__alloyId14);
    $.__views.name = A$(Ti.UI.createTextField({
        left: "5dp",
        right: "5dp",
        top: "5dp",
        width: Ti.UI.FILL,
        heght: Ti.UI.SIZE,
        id: "name"
    }), "TextField", $.__views.__alloyId14);
    $.__views.__alloyId14.add($.__views.name);
    $.__views.__alloyId15 = A$(Ti.UI.createLabel({
        left: 0,
        top: "10dp",
        width: Ti.UI.SIZE,
        font: {
            fontSize: 13
        },
        text: "■ 自己紹介（140文字以内）",
        id: "__alloyId15"
    }), "Label", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId15);
    $.__views.__alloyId16 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderWidth: 2,
        borderColor: "black",
        id: "__alloyId16"
    }), "View", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId16);
    $.__views.description = A$(Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: "100dp",
        id: "description"
    }), "TextArea", $.__views.__alloyId16);
    $.__views.__alloyId16.add($.__views.description);
    $.__views.__alloyId17 = A$(Ti.UI.createLabel({
        left: 0,
        top: "10dp",
        width: Ti.UI.SIZE,
        font: {
            fontSize: 13
        },
        text: "■ WEB（100文字以内）",
        id: "__alloyId17"
    }), "Label", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId17);
    $.__views.__alloyId18 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderWidth: 2,
        borderColor: "black",
        id: "__alloyId18"
    }), "View", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId18);
    $.__views.homepage = A$(Ti.UI.createTextField({
        left: "5dp",
        right: "5dp",
        top: "5dp",
        width: Ti.UI.FILL,
        heght: Ti.UI.SIZE,
        id: "homepage"
    }), "TextField", $.__views.__alloyId18);
    $.__views.__alloyId18.add($.__views.homepage);
    $.__views.__alloyId19 = A$(Ti.UI.createLabel({
        left: 0,
        top: "10dp",
        width: Ti.UI.SIZE,
        font: {
            fontSize: 13
        },
        text: "■ 好きな音楽（100文字以内）",
        id: "__alloyId19"
    }), "Label", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId19);
    $.__views.__alloyId20 = A$(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderWidth: 2,
        borderColor: "black",
        id: "__alloyId20"
    }), "View", $.__views.wrapper);
    $.__views.wrapper.add($.__views.__alloyId20);
    $.__views.likeMusic = A$(Ti.UI.createTextField({
        left: "5dp",
        right: "5dp",
        top: "5dp",
        width: Ti.UI.FILL,
        heght: Ti.UI.SIZE,
        id: "likeMusic"
    }), "TextField", $.__views.__alloyId20);
    $.__views.__alloyId20.add($.__views.likeMusic);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userInfo = require("user_info");
    Alloy.Globals.parent.rightNavButton = $.saveBtn;
    if (userInfo.isLogin()) {
        $.image.image = userInfo.getImageUrl();
        $.name.value = userInfo.get("name");
        $.description.value = userInfo.get("description");
        $.homepage.value = userInfo.get("homepage");
        $.likeMusic.value = userInfo.get("like_music");
    }
    __defers["$.__views.saveBtn!click!save"] && $.__views.saveBtn.on("click", save);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;