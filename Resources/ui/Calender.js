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
    this.title     = this.bindMonth +'月の新刊件数';
    this.navActInd = null;
    this.tableView = Ti.UI.createTableView({
        backgroundColor:'#ededed',
        separatorColor: '#999',
        zIndex:2,
        width:320,
        left:0,
        top:45
    });
    var AppWindow       = require('ui/common/AppWindow');
    this.win = new AppWindow(this.title, false);

}

Calender.prototype.createList = function() {

    var self = this;

    // ファイルのrequire
    var ToolBar      = require('ui/common/toolbar');
    var createActInd = require('ui/common/createActivityIndicator');

    // 起動初期のナビゲータ
    this.navActInd = createActInd.make('start');
    this.tableView.add(this.navActInd);
    this.navActInd.show();

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

        
        self.navActInd = createActInd.make('start');
        self.tableView.add(self.navActInd);
        self.navActInd.show();

        barTitle.setText(self.bindMonth +'月の新刊件数');
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

        self.navActInd = createActInd.make('start');
        self.tableView.add(self.navActInd);
        self.navActInd.show();

        barTitle.setText(self.bindMonth +'月の新刊件数');
        self.exeXhrOnload();
        win1.add(self.tableView);

    });

    var closeBtn = Titanium.UI.createButton({
        title:'戻る',
        style:Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    closeBtn.addEventListener('click', function(e) {
        self.win.close(); 
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

    toolBar = new ToolBar(closeBtn, backBtn,forwardBtn,this.title,barTitle);

    win1.add(toolBar);
    win1.add(this.tableView);

    this.tableView.addEventListener('click',function(e){

        var bDate = self.year + self.bindMonth + self.util.bindDate(e.index + 1);
        var dateParam = {'y':self.year,
            'm':self.month,
            'd':e.index+1,
            'bm':self.bindMonth,
            'bd':self.util.bindDate(e.index + 1),
            'bDate':bDate};
        var dayListReq   = require('ui/List');
        var dayList   = new dayListReq('day', dateParam);
        var dayListWin   = dayList.createList();
        ActiveWinTab.tabs.activeTab.open(dayListWin);

    });

    this.win.add(win1);
    return this.win;
};

Calender.prototype.exeXhrOnload = function() {

    var self = this;
    var params = {'year':this.year, 'month':this.bindMonth};
    var url = this.util.createUrl('calender', params);

    // create
    this.util.exeXhr(self, url, 'GET', 'calender');
    
};

module.exports = Calender;
