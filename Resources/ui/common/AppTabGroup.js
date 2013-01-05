(function() {
    var AppTabGroup;
    AppTabGroup = function() {

        var self = Ti.UI.createTabGroup();

        /**
         * ダッシュボード
         */
        var dashBoardReq = require('ui/Dashboard');
        var dashBoard    = new dashBoardReq('day', '');
        var dashBoardWin = dashBoard.createPage();
        // タブ生成
        var dashBoardTab = Ti.UI.createTab({
            title: 'Dashboard',
            window: dashBoardWin
        });
        dashBoardWin.containingTab = dashBoardTab;
        self.addTab(dashBoardTab);
        dashBoardWin.hideTabBar();

        // toolbar生成
        var toolBarTitle = '新刊チェッカー';
        var createToolbar   = require('ui/common/toolbar');
        var barTitle = Ti.UI.createLabel({
            textAlign:1,  //0:左揃え、 1:中央揃え、2：右揃え
            text:toolBarTitle,
            width:160,
            color:'#FFF',
            font:{ fontSize:14 }
        });
        toolBar = new createToolbar('','','', '', barTitle);
        dashBoardWin.add(toolBar);

        return self;
    };

    return module.exports = AppTabGroup;
})();
