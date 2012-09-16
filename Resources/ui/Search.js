function Search () {

    // 初期値設定
    this.util         = require('lib/util');
    this.tableView    = null;
    this.navActInd    = null;
    this.updating     = null;
    this.lastDistance = null;
    this.lastRow      = 0;
    this.limit        = 20;
    this.defaultPage  = 1;
    this.dayParam     = null;
    this.pageNum      = this.defaultPage;
    this.query        = null;
}    

// リスト表示用
Search.prototype.createList = function(){

    var self = this;
    var data = [];
    var createToolbar   = require('ui/common/toolbar');
    var createActInd    = require('ui/common/createActivityIndicator');


    // 検索バー
    var search = Titanium.UI.createSearchBar({
        barColor:'#000',
        showCancel:false,
        top:0
    });

    // リスト表示処理
    var win = Ti.UI.createView();

    // tableview create
    this.tableView = Ti.UI.createTableView({
        backgroundColor:'#ffffff',
        zIndex:2,
        top:45
    });
    win.add(this.tableView);
    this.tableView.setData(data);
    win.add(search);

    // searchのイベント
    search.addEventListener('cancel', function(e){
        search.blur();
    });
    search.addEventListener('return', function(e){

        // win削除
        win.remove(self.tableView);
   
        // クエリ取得
        self.query = e.value;

        // 起動初期のナビゲーター処理
        self.navActInd = createActInd.make('start');
        self.tableView.add(self.navActInd);
        self.navActInd.show();

        // 初期化
        self.pageNum = self.defaultPage;
        self.tableView.setData(data);
        win.add(self.tableView);

        // json取得
        setTimeout(function(){self.exeXhrOnload()}, 1000);

        search.blur();

    });

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
                loadingRow = Ti.UI.createTableViewRow();
                loadingRow.add(self.navActInd);
                self.tableView.appendRow(loadingRow);
                self.navActInd.show();
                setTimeout(function(){self.exeXhrOnload()}, 1000);
            }
        }
        self.lastDistance = distance;
    });

    // click処理
    this.tableView.addEventListener('click', function(e) {
        var Detail = require('ui/Detail');
        var detail = new Detail(e.rowData.poolData);
    });

    return win;
}

Search.prototype.exeXhrOnload = function() {

    var self = this;
    var params = {'query':self.query, 'page':self.pageNum, 'limit':self.limit};
    if (this.pageNum == this.defaultPage) {
        // 初回
        this.updating = true;
    } else {
        // 更新時
        this.lastRow = this.tableView.data[0].rows.length - 1;
    }

    var url = this.util.createUrl('search', params);
    Ti.API.info(url);
    this.util.exeXhr(self, url, 'GET', 'search');

};

module.exports = Search;
