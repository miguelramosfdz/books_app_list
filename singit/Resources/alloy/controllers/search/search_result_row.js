function Controller() {
    function openSong() {
        var song = songs.get(id);
        alert(song.get("id"));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createView({
        top: "10dp",
        left: "10dp",
        right: "10dp",
        layout: "horizontal",
        height: "40dp",
        id: "row"
    }), "View", null);
    $.addTopLevelView($.__views.row);
    openSong ? $.__views.row.on("click", openSong) : __defers["$.__views.row!click!openSong"] = !0;
    $.__views.image = A$(Ti.UI.createImageView({
        borderWidth: 2,
        borderColor: "black",
        height: "40dp",
        width: "40dp",
        id: "image",
        image: typeof $model.__transform.image_path != "undefined" ? $model.__transform.image_path : $model.get("image_path")
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.image);
    $.__views.rowR = A$(Ti.UI.createView({
        left: "10dp",
        height: Ti.UI.FILL,
        backgroundColor: "#CCC",
        id: "rowR"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.rowR);
    $.__views.title = A$(Ti.UI.createLabel({
        left: "10dp",
        top: "2dp",
        font: {
            fontWight: "bold",
            fontSize: 15
        },
        id: "title",
        text: typeof $model.__transform.title_name != "undefined" ? $model.__transform.title_name : $model.get("title_name")
    }), "Label", $.__views.rowR);
    $.__views.rowR.add($.__views.title);
    $.__views.countView = A$(Ti.UI.createView({
        layout: "horizontal",
        left: "10dp",
        bottom: "2dp",
        height: Ti.UI.SIZE,
        id: "countView"
    }), "View", $.__views.rowR);
    $.__views.rowR.add($.__views.countView);
    $.__views.__alloyId41 = A$(Ti.UI.createLabel({
        right: "10dp",
        font: {
            fontSize: 12
        },
        text: typeof $model.__transform.view_count != "undefined" ? $model.__transform.view_count : $model.get("view_count"),
        id: "__alloyId41"
    }), "Label", $.__views.countView);
    $.__views.countView.add($.__views.__alloyId41);
    $.__views.__alloyId42 = A$(Ti.UI.createLabel({
        right: "10dp",
        font: {
            fontSize: 12
        },
        text: typeof $model.__transform.favorited_count != "undefined" ? $model.__transform.favorited_count : $model.get("favorited_count"),
        id: "__alloyId42"
    }), "Label", $.__views.countView);
    $.__views.countView.add($.__views.__alloyId42);
    $.__views.__alloyId43 = A$(Ti.UI.createLabel({
        right: "10dp",
        font: {
            fontSize: 12
        },
        text: typeof $model.__transform.comments_count != "undefined" ? $model.__transform.comments_count : $model.get("comments_count"),
        id: "__alloyId43"
    }), "Label", $.__views.countView);
    $.__views.countView.add($.__views.__alloyId43);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var songs = Alloy.Collections.song, id;
    $model && (id = $model.get("id"));
    __defers["$.__views.row!click!openSong"] && $.__views.row.on("click", openSong);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;