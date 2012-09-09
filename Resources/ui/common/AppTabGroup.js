(function() {
    var AppTabGroup;
    AppTabGroup = function() {

        var self = Ti.UI.createTabGroup();
        var winReq = require("ui/common/AppWindow")

        /**
         * 新刊リスト
         */ 
        // window作成
        var ListWin = new winReq(L('新刊リスト'), 1);
        // 一日ごとのビュ-生成
        var dayListReq = require("ui/List");
        var dayList = new dayListReq('day', '');
        var dayListView = dayList.createList();

        // 月ごとのビュ-生成
        var monthListReq = require("ui/List");
        var monthList = new monthListReq('month', '');
        var monthListView = monthList.createList();

        // カレンダーのビュ-生成
        var calender = require("ui/Calender");
        var calenderList = new calender();
        var calenderListView = calenderList.createList();

        // 新刊リストはスクロールさせる
        var scrollView = Titanium.UI.createScrollableView({
            views:[calenderListView, dayListView, monthListView],
            showPagingControl: true,
            currentPage:1
        });

        ListWin.add(scrollView);
        // 新刊リストタブ 
        var ListWinTab = Ti.UI.createTab({
            title: L('新刊リスト'),
            icon: './KS_nav_ui.png',
            window: ListWin
        });
        ListWin.containingTab = ListWinTab;
        self.addTab(ListWinTab);

        /**
         * 検索画面
         */
        var searchWin = new winReq(L('作品検索'), false);
        var searchReq = require("ui/Search");
        var searchPage = new searchReq();
        searchWin.add(searchPage.createList());
        // 検索画面タブ
        var searchTab = Ti.UI.createTab({
            title: L('作品検索'),
            icon: './KS_nav_views.png',
            window: searchWin
        });
        searchWin.containingTab = searchTab;
        self.addTab(searchTab);

        /**
         * リストチェック画面
         */
        var favWin = new winReq(L('作品検索'), false);
        //var favReq = require("ui/Fav");
        //var favPage = new favReq();
        //favWin.add(favPage.createList());
        // 検索画面タブ
        var favTab = Ti.UI.createTab({
            title: L('リストチェック'),
            icon: './KS_nav_views.png',
            window: favWin
        });
        favWin.containingTab = favTab;
        self.addTab(favTab);

        /**
         * 設定画面
         */
        //var settingReq = require('ui/common/AppWindow');
        //var settingWin = new settingReq(L('設定'), false);
        
        var Setting = require('ui/Setting');
        var setting = new Setting();
        
        var settingTab = Ti.UI.createTab({
            title: L('settings'),
            icon: './KS_nav_views.png',
            window: setting
        });
        
        // 設定画面タブ
        setting.containingTab = settingTab;
        self.addTab(settingTab);
        return self;
    };

    return module.exports = AppTabGroup;
})();
