(function() {
    var AppTabGroup;
    AppTabGroup = function() {

        var self = Ti.UI.createTabGroup();
        var currentPageNum = 1;
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
        var dataObject = {0:calenderListView, 1:dayListView, 2:monthListView};
        // 新刊リストはスクロールさせる
        var scrollView = Titanium.UI.createScrollableView({
            views:[dataObject[0],dataObject[1],dataObject[2]],
            showPagingControl: true,
            currentPage:currentPageNum
        });

        scrollView.addEventListener('scrollEnd', function(e){
            i = (scrollView.currentPage + 1) % scrollView.views.length;

            if (i == 0) {
                var first  = 1;
                var second = 2;
                var third  = 0;

            } else if (i == 1) {
                var first  = 2;
                var second = 0;
                var third  = 1;

            } else {
                var first  = 0;
                var second = 1;
                var third  = 2;

            }
            //scrollView.views = [dataObject[first], dataObject[second], dataObject[third]];
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
