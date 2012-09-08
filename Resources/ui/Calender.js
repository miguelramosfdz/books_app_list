function Calender() {

    // require
    this.util     = require('lib/util');
    this.calendarData = require('lib/calendarData');
    this.calendar     = require('lib/weeklyCalendar');

    // 今月の値を取得
    this.dateObj  = this.util.getDate('motnh');
    this.year      = this.dateObj.y;
    this.month     = this.dateObj.m;
    this.bindMonth = this.dateObj.bm;
    this.day       = this.dateObj.d;
    this.title     = this.bindMonth +'月';
    this.tableView = Ti.UI.createTableView({
        backgroundColor:'#ededed',
        separatorColor: '#999',
        zIndex:2,
        width:320,
        left:0,
        top:40
    });

}

Calender.prototype.createList = function() {

    var self = this;

    // ファイルのrequire
    var dayListReq   = require('ui/List');
    var ToolBar      = require('ui/common/toolbar');

    this.exeXhrOnload();

    var win1 = Titanium.UI.createView();

    var forwardBtn = Titanium.UI.createButton({
        title:String.fromCharCode(0x25b8)
    });
    forwardBtn.addEventListener('click',function(e){
        win1.remove(self.tableView);
        var nextDate = self.util.nextMonth(self.year, self.month);
        self.year  = nextDate.y;
        self.month = nextDate.m;
        self.bindMonth = nextDate.bm;
        
        barTitle.setText(self.bindMonth +'月の発売件数');
        self.exeXhrOnload();
        win1.add(self.tableView);

    });

    var backBtn = Titanium.UI.createButton({
        title:String.fromCharCode(0x25c2)

    });
    backBtn.addEventListener('click',function(e){
        win1.remove(self.tableView);
        var backDate = self.util.backMonth(self.year, self.month);
        self.year  = backDate.y;
        self.month = backDate.m;
        self.bindMonth = backDate.bm;

        barTitle.setText(self.bindMonth +'月');
        self.exeXhrOnload();
        win1.add(self.tableView);

    });

    var barTitle = Ti.UI.createLabel({
        textAlign:1,  //0:左揃え、 1:中央揃え、2：右揃え
        text:this.title,
        width:100,
        color:'#FFF',
        font:{
            fontSize:14
        }
    });

    toolBar = new ToolBar(backBtn,forwardBtn,this.title,barTitle);

    win1.add(toolBar);
    win1.add(this.tableView);

    this.tableView.addEventListener('click',function(e){

        var bDate = self.year + self.bindMonth + self.util.bindDate(e.index + 1);
        var dateParam = {'y':self.year, 'm':self.month, 'd':e.index+1, 'bm':self.bindMonth, 'bd':'', 'bDate':bDate};
        var oneDayReq = require('ui/common/AppWindow');
        var oneDayWin = new oneDayReq(L('新刊リスト'), 0);
        var dayList   = new dayListReq('day', dateParam);
        oneDayWin.add(dayList.createList());
        ActiveWinTab.tabs.activeTab.open(oneDayWin);

    });

    return win1;
};

Calender.prototype.exeXhrOnload = function() {

    var self = this;
    var auth   = require('lib/Auth');
    var params = {'year':this.year, 'month':this.bindMonth};
        Ti.API.info('-----2-----');
    Ti.API.info(params);
    var url = this.util.createUrl('calender', params);
    Ti.API.info(url);

    var xhr = Ti.Network.createHTTPClient();
    xhr.timeout = 5000;
    xhr.open("GET", url);
    var authstr = auth.makeAuthStr();
    xhr.setRequestHeader('Authorization', authstr);
    xhr.onload = function() {

        // データ取得
        var listLine = JSON.parse(this.responseText);
        // カレンダー表示用データ生成
        var rows         = self.calendarData.make(self.year, self.month);
        var date = {'y':self.year, 'm':self.month, 'd':self.day};
        var calendarRow  = self.calendar.make(rows, listLine);
        self.tableView.setData(calendarRow);

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

module.exports = Calender;
