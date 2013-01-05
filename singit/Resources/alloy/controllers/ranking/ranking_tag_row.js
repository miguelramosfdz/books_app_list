function Controller() {
    function tagClick() {
        var tag = tags.get(id);
        alert(tag.get("name"));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tagColumn = A$(Ti.UI.createView({
        right: "5dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "#EEE",
        layout: "horizontal",
        id: "tagColumn"
    }), "View", null);
    $.addTopLevelView($.__views.tagColumn);
    tagClick ? $.__views.tagColumn.on("click", tagClick) : __defers["$.__views.tagColumn!click!tagClick"] = !0;
    $.__views.tagName = A$(Ti.UI.createLabel({
        wordWrap: !1,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        top: "3dp",
        bottom: "3dp",
        id: "tagName",
        text: typeof $model.__transform.label != "undefined" ? $model.__transform.label : $model.get("label")
    }), "Label", $.__views.tagColumn);
    $.__views.tagColumn.add($.__views.tagName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tags = Alloy.Collections.tag, id;
    $model && (id = $model.get("id"));
    __defers["$.__views.tagColumn!click!tagClick"] && $.__views.tagColumn.on("click", tagClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;