function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds"
    });
    $.__views.ds.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = [], menuList = [ {
        name: "メニュー",
        rows: [ {
            title: "歌う",
            customView: "sing",
            image: "music.png"
        }, {
            title: "聴く",
            customView: "ranking/ranking",
            image: "headphone.png"
        } ]
    }, {
        name: "マイページ",
        rows: [ {
            title: "プロフィール",
            customView: "mypage/profile",
            image: "user.png"
        }, {
            title: "歌投稿一覧",
            customView: "mypage/profile",
            image: "user.png"
        }, {
            title: "お気に入り曲",
            customView: "mypage/profile",
            image: "user.png"
        }, {
            title: "お気に入りユーザ",
            customView: "mypage/profile",
            image: "user.png"
        } ]
    }, {
        name: "その他",
        rows: [ {
            title: "お知らせ",
            customView: "mypage/profile",
            image: "user.png"
        }, {
            title: "利用規約",
            customView: "mypage/profile",
            image: "user.png"
        }, {
            title: "アプリについて",
            customView: "mypage/profile",
            image: "user.png"
        } ]
    } ];
    _.map(menuList, function(menu) {
        var section = Ti.UI.createTableViewSection(), customView = Ti.UI.createView({
            height: "auto",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "0%",
                    y: "0%"
                },
                endPoint: {
                    x: "0%",
                    y: "100%"
                },
                colors: [ {
                    color: "#333",
                    offset: 0
                }, {
                    color: "#000",
                    offset: 1
                } ]
            }
        }), customLabel = Ti.UI.createLabel({
            top: 8,
            bottom: 8,
            left: 10,
            right: 10,
            height: "auto",
            text: menu.name,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "white"
        });
        customView.add(customLabel);
        section.headerView = customView;
        _.map(menu.rows, function(row) {
            section.add(Alloy.createController("menurow", row).getView());
        });
        data.push(section);
    });
    $.ds.tableView.data = data;
    var currentView = Alloy.createController("top").getView();
    $.ds.innerwin.add(currentView);
    $.ds.innerwin.title = "歌ってみろ";
    Alloy.Globals.parent = $.ds.innerwin;
    $.ds.tableView.addEventListener("click", function selectRow(e) {
        if (currentView.id != e.row.customView) {
            $.ds.innerwin.remove(currentView);
            currentView = Alloy.createController(e.row.customView).getView();
            $.ds.innerwin.add(currentView);
            $.ds.innerwin.title = e.row.customTitle;
        }
        $.ds.toggleSlider();
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;