function Dashboard(type, dateParam) {

    // 初期値設定
    this.util         = require('lib/util');
    this.navActInd    = null;
    this.item = null;

    // 日付取得
    if (dateParam === '') {
        var dateObj = this.util.getDate(this.pageType);

    } else {
        var dateObj = dateParam;

    }
    this.year           = dateObj.y;
    this.month          = dateObj.m;
    this.day            = dateObj.d;
    this.bindMonth      = dateObj.bm;
    this.dayParam       = dateObj.bDate;
    if (this.pageType === 'day') {
        this.toolBarTitle = dateObj.bm + '/' + dateObj.bd + ' 発売日の新刊';
    } else {
        this.toolBarTitle = dateObj.bm + '月発売の新刊';
    }

    // window生成
    var AppWindow = require('ui/common/AppWindow');
    this.win      = new AppWindow('新刊チェッカー メニュー', false);

}    

// リスト表示用
Dashboard.prototype.createPage = function(){

    var self = this;
    var data = [];
    var labelsKey = {0:'day', 1:'mon', 2:'cal', 3:'che', 4:'sea', 5:'set'};
    var createActInd    = require('ui/common/createActivityIndicator');

    this.navActInd = createActInd.make('start');
    this.win.add(this.navActInd);
    this.navActInd.show();


    // dashboard生成
    var c;
    var labelLength = this.util.objCount(labelsKey);
    for (c =0; c < labelLength; c++) {
        if (labelsKey[c] === 'day') {
            this.item = Titanium.UI.createDashboardItem({
                image:'/images/' + labelsKey[c] + '_off.png',
                selectedImage:'/images/' + labelsKey[c] + '_on.png',
                label:labelsKey[c]
            });
            // 今日の件数を取得
            var params = {'year':this.year, 'month':this.bindMonth};
            var url = this.util.createUrl('dashboard', params);
            this.util.exeXhr(this, url, 'GET', 'dashboard');
            data.push(this.item);

        } else {
            var item = Titanium.UI.createDashboardItem({
                image:'/images/' + labelsKey[c] + '_off.png',
                selectedImage:'/images/' + labelsKey[c] + '_on.png',
                label:labelsKey[c]
            });
            data.push(item);

        }
    }

    var dashboard = Titanium.UI.createDashboardView({
        top:30,
        zIndex:2,
        data:data
    });
    this.win.add(dashboard);
    this.navActInd.hide();

    // ページ生成
    dashboard.addEventListener('click', function(e) {
        switch(e.item.label) {
            case 'day' :
                var dayListReq = require("ui/List");
                var dayList = new dayListReq('day', '');
                var dayListWin = dayList.createList();
                ActiveWinTab.tabs.activeTab.open(dayListWin);
                break;
            case 'mon' :
                var monthListReq = require("ui/List");
                var monthList = new monthListReq('month', '');
                var monthListWin = monthList.createList();
                ActiveWinTab.tabs.activeTab.open(monthListWin);
                break;
            case 'cal' :
                var calender = require("ui/Calender");
                var calenderList = new calender();
                var calenderListWin = calenderList.createList();
                ActiveWinTab.tabs.activeTab.open(calenderListWin);
                break;
            case 'sea' :
                var searchReq  = require("ui/Search");
                var searchPage = new searchReq();
                var searchWin  = searchPage.createList();
                ActiveWinTab.tabs.activeTab.open(searchWin);
                break;
            case 'set' :
                var SettingReq = require('ui/Setting');
                var settingWin = new SettingReq();
                ActiveWinTab.tabs.activeTab.open(settingWin);
                break;
            default : 
                break;
        }
    });

    return this.win;
}

module.exports = Dashboard;
