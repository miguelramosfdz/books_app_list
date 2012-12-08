(function() {
    var AppTabGroup;
    AppTabGroup = function() {

        var self = Ti.UI.createTabGroup();
        var currentPageNum = 1;

        /**
         * 新刊リスト
         */ 
        // window作成
        var ListReq = require("ui/common/AppWindow")
        var ListWin = new ListReq(L('新刊リスト'), 1);
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
        var dataObject = {0:calenderList, 1:dayListView, 2:monthListView};
        // 新刊リストはスクロールさせる
        var scrollView = Titanium.UI.createScrollableView({
            views:[dataObject[0],dataObject[1],dataObject[2]],
            showPagingControl: true,
            currentPage:currentPageNum
        });

        scrollView.addEventListener('scrollEnd', function(e){
            i = (scrollView.currentPage + 1) % 3;
            //Ti.API.info(e);
            //scrollView.addView(dayListView);
            Ti.API.info(scrollView.views.length);
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
        var searchWinReq = require('ui/common/AppWindow');
        var searchWin = new searchWinReq(L('作品検索'), false);
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
        var favWinReq = require('ui/common/AppWindow');
        var favWin = new favWinReq(L('作品検索'), false);
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
        var settingReq = require('ui/common/AppWindow');
        var settingWin = new settingReq(L('設定'), false);
        var settingTab = Ti.UI.createTab({
            title: L('settings'),
            icon: './KS_nav_views.png',
            window: settingWin
        });
        // 設定画面タブ
        settingWin.containingTab = settingTab;
        self.addTab(settingTab);
        return self;
    };

    return module.exports = AppTabGroup;
})();
