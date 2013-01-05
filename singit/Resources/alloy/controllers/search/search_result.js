function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("song");
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.__alloyId36 = A$(Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId36"
    }), "ScrollView", $.__views.win);
    $.__views.win.add($.__views.__alloyId36);
    $.__views.header = A$(Ti.UI.createLabel({
        top: "15dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "「{query}」の検索結果",
        id: "header"
    }), "Label", $.__views.__alloyId36);
    $.__views.__alloyId36.add($.__views.header);
    $.__views.list = A$(Ti.UI.createView({
        top: "20dp",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: !0,
        showHorizontalScrollIndicator: !1,
        id: "list"
    }), "View", $.__views.__alloyId36);
    $.__views.__alloyId36.add($.__views.list);
    var __alloyId40 = function(e) {
        var models = Alloy.Collections.song.models, len = models.length;
        while ($.__views.list.children.length > 0) {
            var child = $.__views.list.children[0];
            if (child) {
                $.__views.list.remove(child);
                child = null;
            }
        }
        for (var i = 0; i < len; i++) {
            var __alloyId37 = models[i];
            __alloyId37.__transform = {};
            var __alloyId39 = Alloy.createController("search/search_result_row", {
                id: "__alloyId38",
                $model: __alloyId37
            });
            __alloyId39.setParent($.__views.list);
        }
    };
    Alloy.Collections.song.on("fetch destroy change add remove reset", __alloyId40);
    exports.destroy = function() {
        Alloy.Collections.song.off("fetch destroy change add remove reset", __alloyId40);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, songs = Alloy.Collections.song;
    songs.on("fetch", function() {
        $.header.text = "「" + args.query + "」の検索結果 " + this.length + "件";
    });
    songs.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;