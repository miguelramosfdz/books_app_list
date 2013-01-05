function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.one = A$(Ti.UI.createView({
        layout: "vertical",
        top: "10dp",
        height: "30%",
        width: "30%",
        left: "5dp",
        right: "5dp",
        borderWidth: 1,
        borderColor: "black",
        id: "one"
    }), "View", null);
    $.addTopLevelView($.__views.one);
    $.__views.__alloyId10 = A$(Ti.UI.createLabel({
        text: typeof $model.__transform.rank != "undefined" ? $model.__transform.rank : $model.get("rank"),
        id: "__alloyId10"
    }), "Label", $.__views.one);
    $.__views.one.add($.__views.__alloyId10);
    $.__views.image = A$(Ti.UI.createImageView({
        image: typeof $model.__transform.image_path != "undefined" ? $model.__transform.image_path : $model.get("image_path"),
        id: "image"
    }), "ImageView", $.__views.one);
    $.__views.one.add($.__views.image);
    $.__views.__alloyId11 = A$(Ti.UI.createLabel({
        text: typeof $model.__transform.title_name != "undefined" ? $model.__transform.title_name : $model.get("title_name"),
        id: "__alloyId11"
    }), "Label", $.__views.one);
    $.__views.one.add($.__views.__alloyId11);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;