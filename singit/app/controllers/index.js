
var data = [];

var menuList = [ 
{
    name: "メニュー",
    rows: [
        {
            title : '歌う',
            customView : 'sing',
            image : "music.png"
        },
        {
            title : '聴く',
            customView : 'ranking/ranking',
            image : "headphone.png"
        }
    ]
}, 
{
    name: "マイページ",
    rows: [
        {
            title : 'プロフィール',
            customView : 'mypage/profile',
            image : "user.png"
        },
        {
            title : '歌投稿一覧',
            customView : 'mypage/profile',
            image : "user.png"
        },
        {
            title : 'お気に入り曲',
            customView : 'mypage/profile',
            image : "user.png"
        },
        {
            title : 'お気に入りユーザ',
            customView : 'mypage/profile',
            image : "user.png"
        }
    ]
},
{
    name: "その他",
    rows: [
        {
            title : 'お知らせ',
            customView : 'mypage/profile',
            image : "user.png"
        },
        {
            title : '利用規約',
            customView : 'mypage/profile',
            image : "user.png"
        },
        {
            title : 'アプリについて',
            customView : 'mypage/profile',
            image : "user.png"
        }
    ]
}];


_.map(menuList, function(menu) {
    var section = Ti.UI.createTableViewSection();
    var customView = Ti.UI.createView({
        height: 'auto',
        backgroundGradient : {
            type : "linear",
            startPoint : {
                x : "0%",
                y : "0%"
            },
            endPoint : {
                x : "0%",
                y : "100%"
            },
            colors : [{
                color : "#333",
                offset : 0.0
            }, {
                color : "#000",
                offset : 1.0
            }]
        }
    });

    var customLabel = Ti.UI.createLabel({
        top : 8,
        bottom : 8,
        left : 10,
        right : 10,
        height : 'auto',
        text : menu.name,
        font : {
            fontSize : 12,
            fontWeight : 'bold'
        },
        color : 'white'
    });

    customView.add(customLabel);

    section.headerView = customView;

    _.map(menu.rows, function(row) {
        section.add(Alloy.createController('menurow', row).getView());
    });

    data.push(section);
});

// Pass data to widget tableView
$.ds.tableView.data = data;

var currentView = Alloy.createController("top").getView();
$.ds.innerwin.add(currentView);
$.ds.innerwin.title = '歌ってみろ';

Alloy.Globals.parent = $.ds.innerwin;

// Swap views on menu item click
$.ds.tableView.addEventListener('click', function selectRow(e) {

    if (currentView.id != e.row.customView) {
        $.ds.innerwin.remove(currentView);
        currentView = Alloy.createController(e.row.customView).getView();
        $.ds.innerwin.add(currentView);
        $.ds.innerwin.title = e.row.customTitle;
    }
    $.ds.toggleSlider();
});

$.index.open();
