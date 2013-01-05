function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.songWrapper = A$(Ti.UI.createView({
        layout: "vertical",
        top: "10dp",
        width: "30%",
        height: "130dp",
        id: "songWrapper"
    }), "View", null);
    $.addTopLevelView($.__views.songWrapper);
    $.__views.__alloyId33 = A$(Ti.UI.createLabel({
        text: typeof $model.__transform.rank != "undefined" ? $model.__transform.rank : $model.get("rank"),
        id: "__alloyId33"
    }), "Label", $.__views.songWrapper);
    $.__views.songWrapper.add($.__views.__alloyId33);
    $.__views.songColumn = A$(Ti.UI.createView({
        left: "5dp",
        right: "5dp",
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "black",
        id: "songColumn"
    }), "View", $.__views.songWrapper);
    $.__views.songWrapper.add($.__views.songColumn);
    $.__views.songImage = A$(Ti.UI.createImageView({
        top: 0,
        backgroundColor: "white",
        id: "songImage",
        image: typeof $model.__transform.image_path != "undefined" ? $model.__transform.image_path : $model.get("image_path")
    }), "ImageView", $.__views.songColumn);
    $.__views.songColumn.add($.__views.songImage);
    $.__views.songTitle = A$(Ti.UI.createLabel({
        top: "70dp",
        color: "white",
        id: "songTitle",
        text: typeof $model.__transform.title_name != "undefined" ? $model.__transform.title_name : $model.get("title_name")
    }), "Label", $.__views.songColumn);
    $.__views.songColumn.add($.__views.songTitle);
    $.__views.songViewCountLbl = A$(Ti.UI.createLabel({
        top: "50dp",
        right: "10dp",
        zIndex: 100,
        id: "songViewCountLbl",
        text: typeof $model.__transform.view_count != "undefined" ? $model.__transform.view_count : $model.get("view_count")
    }), "Label", $.__views.songColumn);
    $.__views.songColumn.add($.__views.songViewCountLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;