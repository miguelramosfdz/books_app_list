function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        backgroundColor: "#999",
        height: "38dp",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.icon = A$(Ti.UI.createImageView({
        width: "30",
        height: "30",
        left: "5dp",
        id: "icon"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.icon);
    $.__views.__alloyId9 = A$(Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId9"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.__alloyId9);
    $.__views.title = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: "16"
        },
        left: "48dp",
        id: "title"
    }), "Label", $.__views.__alloyId9);
    $.__views.__alloyId9.add($.__views.title);
    $.__views.line = Alloy.createWidget("net.hoyohoyo.zuruiline", "widget", {
        bottom: 0,
        width: Ti.UI.FILL,
        alphaBlack: 0.9,
        gradientEnabled: !1,
        id: "line"
    });
    $.__views.line.setParent($.__views.row);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.icon.image = args.image;
    $.title.text = args.title || "";
    $.row.customView = args.customView || "";
    $.row.customTitle = $.title.text;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;