function Controller() {
    function showRequestPage() {
        alert("request");
    }
    function search() {
        var controller = Alloy.createController("search/search_result", {
            query: "test"
        }).getView();
        Alloy.Globals.parent.add(controller);
    }
    function songTransform(model) {
        var transform = model.toJSON();
        transform.rank = rank++;
        return transform;
    }
    function tagTransform(model) {
        var transform = model.toJSON();
        transform.label = transform.name + " (" + transform.tags_count + ")";
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("tag");
    $.songs = Alloy.createCollection("song");
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "タイトル選択"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.requestBtn = A$(Ti.UI.createButton({
        id: "requestBtn",
        title: "リクエスト"
    }), "Button", null);
    showRequestPage ? $.__views.requestBtn.on("click", showRequestPage) : __defers["$.__views.requestBtn!click!showRequestPage"] = !0;
    $.__views.win.rightNavButton = $.__views.requestBtn;
    $.__views.__alloyId24 = A$(Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId24"
    }), "View", $.__views.win);
    $.__views.win.add($.__views.__alloyId24);
    $.__views.rankingView = A$(Ti.UI.createScrollView({
        layout: "horizontal",
        top: "10dp",
        left: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: !1,
        showHorizontalScrollIndicator: !0,
        bubbleParent: !1,
        id: "rankingView",
        dataTransform: "songTransform"
    }), "ScrollView", $.__views.__alloyId24);
    $.__views.__alloyId24.add($.__views.rankingView);
    var __alloyId28 = function(e) {
        var models = $.songs.models, len = models.length;
        while ($.__views.rankingView.children.length > 0) {
            var child = $.__views.rankingView.children[0];
            if (child) {
                $.__views.rankingView.remove(child);
                child = null;
            }
        }
        for (var i = 0; i < len; i++) {
            var __alloyId25 = models[i];
            __alloyId25.__transform = songTransform(__alloyId25);
            var __alloyId27 = Alloy.createController("ranking/ranking_song_row", {
                id: "__alloyId26",
                $model: __alloyId25
            });
            __alloyId27.setParent($.__views.rankingView);
        }
    };
    $.songs.on("fetch destroy change add remove reset", __alloyId28);
    $.__views.searchView = A$(Ti.UI.createView({
        top: "20dp",
        left: "10dp",
        right: "10dp",
        height: Ti.UI.SIZE,
        id: "searchView",
        layout: "horizontal"
    }), "View", $.__views.__alloyId24);
    $.__views.__alloyId24.add($.__views.searchView);
    $.__views.searchField = A$(Ti.UI.createTextField({
        width: "80%",
        height: 30,
        borderWidth: 2,
        borderColor: "black",
        id: "searchField"
    }), "TextField", $.__views.searchView);
    $.__views.searchView.add($.__views.searchField);
    $.__views.searchBtn = A$(Ti.UI.createButton({
        width: "20%",
        height: 30,
        bubbleParent: !1,
        id: "searchBtn",
        title: "検索"
    }), "Button", $.__views.searchView);
    $.__views.searchView.add($.__views.searchBtn);
    search ? $.__views.searchBtn.on("click", search) : __defers["$.__views.searchBtn!click!search"] = !0;
    $.__views.tagView = A$(Ti.UI.createView({
        top: "20dp",
        left: "10dp",
        right: "10dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        layout: "horizontal",
        id: "tagView",
        dataTransform: "tagTransform"
    }), "View", $.__views.__alloyId24);
    $.__views.__alloyId24.add($.__views.tagView);
    var __alloyId32 = function(e) {
        var models = Alloy.Collections.tag.models, len = models.length;
        while ($.__views.tagView.children.length > 0) {
            var child = $.__views.tagView.children[0];
            if (child) {
                $.__views.tagView.remove(child);
                child = null;
            }
        }
        for (var i = 0; i < len; i++) {
            var __alloyId29 = models[i];
            __alloyId29.__transform = tagTransform(__alloyId29);
            var __alloyId31 = Alloy.createController("ranking/ranking_tag_row", {
                id: "__alloyId30",
                $model: __alloyId29
            });
            __alloyId31.setParent($.__views.tagView);
        }
    };
    Alloy.Collections.tag.on("fetch destroy change add remove reset", __alloyId32);
    exports.destroy = function() {
        $.songs.off("fetch destroy change add remove reset", __alloyId28);
        Alloy.Collections.tag.off("fetch destroy change add remove reset", __alloyId32);
    };
    _.extend($, $.__views);
    Alloy.Globals.parent.rightNavButton = $.requestBtn;
    var rank = 1;
    Alloy.Collections.tag.fetch({
        data: {
            limit: 10
        }
    });
    $.songs.fetch({
        data: {
            limit: 10
        }
    });
    __defers["$.__views.requestBtn!click!showRequestPage"] && $.__views.requestBtn.on("click", showRequestPage);
    __defers["$.__views.searchBtn!click!search"] && $.__views.searchBtn.on("click", search);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;