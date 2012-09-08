function List (type, dateParam) {

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
        this.toolBarTitle = dateObj.m + '/' + dateObj.d + ' 発売日の新刊';
    } else {
        this.toolBarTitle = dateObj.m + '月発売の新刊';
    }
}    

// リスト表示用
List.prototype.createList = function(){

    Ti.API.info(this.pageType);
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
    win.add(this.navActInd);
    this.navActInd.show();

    // json取得
    this.exeXhrOnload();

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
        self.pageNum = self.defaultPage;
        self.tableView.setData(data);
        win.add(self.tableView);
        self.exeXhrOnload();

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
        self.pageNum = self.defaultPage;
        self.tableView.setData(data);
        win.add(self.tableView);
        self.exeXhrOnload();

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
    var Auth = require('lib/Auth');
    var params = {'date':self.dayParam, 'page':self.pageNum, 'limit':self.limit};
    var url = this.util.createUrl('day',params); 
    Ti.API.info(url);

    if (this.pageNum == this.defaultPage) {
        // 初回
        this.updating = true;
    } else {
        // 更新時
        this.lastRow = this.tableView.data[0].rows.length - 1;
    }

    var xhr = Ti.Network.createHTTPClient({cache:true});
    xhr.timeout = 5000;
    xhr.open("GET", url);
    var authstr = Auth.makeAuthStr();
    xhr.setRequestHeader('Authorization', authstr);
    xhr.onload = function() {

        // データ取得
        var listLine = JSON.parse(this.responseText);
        self.navActInd.hide();
        var i = 0;
        var listLen = listLine.length;
        var createTableList = require('ui/common/createTableVIewList');

        if (listLine != false) {
            while (i < listLen) {
                var row = createTableList.make(listLine[i]);
                if (i == 0 && self.pageNum != self.defaultPage) {
                    // １ページ目ではなくかつはじめにきた場合
                    self.tableView.updateRow(self.lastRow,row);
                } else {
                    self.tableView.appendRow(row);
                }
                i++;
            }

        }  else {
            var emptyRow = createTableList.emptyMake();
            if (self.pageNum != self.defaultPage) {
                self.tableView.updateRow(self.lastRow, emptyRow);
            } else {
                self.tableView.appendRow(emptyRow);
            }
            self.updating = true;

        }

        self.pageNum += 1;

        if (i > 0) {
            self.updating = false;

        }
        // メモリリーク対策
        xhr.onload = null;
        xhr.onreadystatechange = null;
        xhr.ondatastream = null;
        xhr.onerror = null;
        xhr = null;  

    };
    xhr.onerror = function() {
        Ti.UI.createAlertDialog({
            title:'ネットワークエラー',
            message:'時間を置いて試してください',
            buttonName:['OK']
        }).show();
        var errorResult = {};
        callback(errorResult);

        // メモリリーク対策
        xhr.onload = null;
        xhr.onreadystatechange = null;
        xhr.ondatastream = null;
        xhr.onerror = null;
        xhr = null;  
    }
    xhr.send();
};

module.exports = List;
