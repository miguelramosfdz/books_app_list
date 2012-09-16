function List (type, dateParam) {

    // 初期値設定
    this.util         = require('lib/util');
    this.tableView    = null;
    this.navActInd    = null;
    this.updating     = null;
    this.lastDistance = null;
    this.lastRow      = 0;
    this.limit        = 30;
    this.defaultPage  = 1;
    this.dayParam     = null;
    this.pageNum      = this.defaultPage;
    this.pageType     = type;

    // 日付取得
    if (dateParam === '') {
        var dateObj = this.util.getDate(this.pageType);
        
    } else {
        var dateObj = dateParam;

    }
    this.year         = dateObj.y;
    this.month        = dateObj.m;
    this.day          = dateObj.d;
    this.dayParam     = dateObj.bDate;
    if (this.pageType === 'day') {
        this.toolBarTitle = dateObj.bm + '/' + dateObj.bd + ' 発売日の新刊';
    } else {
        this.toolBarTitle = dateObj.bm + '月発売の新刊';
    }
}    

// リスト表示用
List.prototype.createList = function(){

    var self = this;
    var data = [];
    var createToolbar   = require('ui/common/toolbar');
    var createActInd    = require('ui/common/createActivityIndicator');

    // リスト表示処理
    var win = Ti.UI.createView();


    // tableview create
    this.tableView = Ti.UI.createTableView({
        backgroundColor:'#ffffff',
        zIndex:2,
        top:40
    });
    win.add(this.tableView);
    this.tableView.setData(data);

    // 起動初期のナビゲーター処理
    this.navActInd = createActInd.make('start');
    this.tableView.add(this.navActInd);
    this.navActInd.show();

    // json取得
    setTimeout(function(){self.exeXhrOnload()}, 500);


    // scroll処理
    this.tableView.addEventListener('scroll',function(e) {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total  = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;

        if (distance < self.lastDistance) {
            var nearEnd = theEnd;
            if (!self.updating && (total >= nearEnd)) {
                self.updating = true;
                self.navActInd = createActInd.make('update');
                loadingRow = Ti.UI.createTableViewRow({className:'noImage'});
                loadingRow.add(self.navActInd);
                self.tableView.appendRow(loadingRow);
                self.navActInd.show();
                setTimeout(function(){self.exeXhrOnload()}, 2000);
            }
        }
        self.lastDistance = distance;
    });

    // click処理
    this.tableView.addEventListener('click', function(e) {
        var Detail = require('ui/Detail');
        var detail = new Detail(e.rowData.poolData);
    });

    var forwardBtn = Titanium.UI.createButton({
        title:String.fromCharCode(0x25b8)
    });
    forwardBtn.addEventListener('click',function(e){

        win.remove(self.tableView);
        if (self.pageType === 'day') {
            var nextDate = self.util.nextDay(self.year, self.month, self.day);
            barTitle.setText(nextDate.bm +'/' + nextDate.bd + ' 発売日の新刊');
            self.year = nextDate.y;
            self.month = nextDate.m;
            self.day = nextDate.d;
            self.dayParam = nextDate.y + nextDate.bm + nextDate.bd;

        } else {
            var nextDate = self.util.nextMonth(self.year, self.month);
            barTitle.setText(nextDate.bm + '月発売の新刊');
            self.year = nextDate.y;
            self.month = nextDate.m;
            self.dayParam = nextDate.y + nextDate.bm;

        }

        // テーブル初期化
        self.pageNum = self.defaultPage;
        self.tableView.setData(data);
        win.add(self.tableView);

        // インジゲータ生成
        self.navActInd = createActInd.make('start');
        self.tableView.add(self.navActInd);
        self.navActInd.show();
        setTimeout(function(){self.exeXhrOnload()}, 500);

    });

    var backBtn = Titanium.UI.createButton({
        title:String.fromCharCode(0x25c2)

    });
    backBtn.addEventListener('click',function(){

        win.remove(self.tableView);
        if (self.pageType === 'day') {
            var backDate = self.util.backDay(self.year, self.month, self.day);
            barTitle.setText(backDate.bm +'/' + backDate.bd + ' 発売日の新刊');
            self.year = backDate.y;
            self.month = backDate.m;
            self.day = backDate.d;
            self.dayParam = backDate.y + backDate.bm + backDate.bd;
        } else {
            var backDate = self.util.backMonth(self.year, self.month);
            barTitle.setText(backDate.bm + '月発売の新刊');
            self.year = backDate.y;
            self.month = backDate.m;
            self.dayParam = backDate.y + backDate.bm;
        }
        // テーブル初期化
        self.pageNum = self.defaultPage;
        self.tableView.setData(data);
        win.add(self.tableView);

        // インジゲータ生成
        self.navActInd = createActInd.make('start');
        self.tableView.add(self.navActInd);
        self.navActInd.show();
        setTimeout(function(){self.exeXhrOnload()}, 500);
    });

    var barTitle = Ti.UI.createLabel({
        textAlign:1,  //0:左揃え、 1:中央揃え、2：右揃え
        text:this.toolBarTitle,
        width:160,
        color:'#FFF',
        font:{ fontSize:14 }
    });
    toolBar = new createToolbar(backBtn,forwardBtn,this.toolBarTitle,barTitle);
    win.add(toolBar);

    return win;
}

List.prototype.exeXhrOnload = function() {

    var self = this;
    var params = {'date':self.dayParam, 'page':self.pageNum, 'limit':self.limit};
    if (this.pageNum == this.defaultPage) {
        // 初回
        this.updating = true;
    } else {
        // 更新時
        this.lastRow = this.tableView.data[0].rows.length - 1;
    }
    var url = this.util.createUrl('day',params);
    this.util.exeXhr(self, url, 'GET', 'list');
};

module.exports = List;
