(function() {
    var Calender;
    Calender = function() {
        // ファイルのrequire
        var calendarData = require('lib/calendarData');
        var calendar     = require('lib/weeklyCalendar');
        var dayListReq   = require('ui/List');
        var ToolBar      = require('ui/common/toolbar');
        var util         = require('lib/util');

        // 今月の値を取得
        dateObj  = util.getDate('day');
        year     = dateObj.y;
        month    = dateObj.m;
        bindMonth= dateObj.bm;
        day      = dateObj.d;

        var title = bindMonth +'月';
        var rows         = calendarData.make(year, month);
        var calendarRow  = calendar.make(rows);

        var tableView = Ti.UI.createTableView({
            backgroundColor:'#ededed',
            separatorColor: '#999',
            zIndex:2,
            width:320,
            left:0,
            top:40
        });
        tableView.setData(calendarRow);

        var win1 = Titanium.UI.createView();
        var yearLabel = Ti.UI.createLabel({
            text:title,
            color:'#FFF'
        });

        var forwardBtn = Titanium.UI.createButton({
            title:String.fromCharCode(0x25b8)
        });
        forwardBtn.addEventListener('click',function(e){
            win1.remove(tableView);
            var nextDate = util.nextMonth(year, month);
            year  = nextDate.y;
            month = nextDate.m;

            barTitle.setText(nextDate.bm +'月');
            rows = calendarData.make(year, month);
            calendarRow = calendar.make(rows);
            tableView.setData(calendarRow);

            win1.add(tableView);

        });

        var backBtn = Titanium.UI.createButton({
            title:String.fromCharCode(0x25c2)

        });
        backBtn.addEventListener('click',function(e){
            win1.remove(tableView);
            var backDate = util.backMonth(year, month);
            year  = backDate.y;
            month = backDate.m;
            barTitle.setText(backDate.bm +'月');
            rows = calendarData.make(year, month);
            calendarRow = calendar.make(rows);

            tableView.setData(calendarRow);
            win1.add(tableView);

        });

        var barTitle = Ti.UI.createLabel({
            textAlign:1,  //0:左揃え、 1:中央揃え、2：右揃え
            text:title,
            width:100,
            color:'#FFF',
            font:{
                fontSize:14
            }
        });

        toolBar = new ToolBar(backBtn,forwardBtn,title,barTitle);

        win1.add(toolBar);
        win1.add(tableView);

        tableView.addEventListener('click',function(e){
        
            dayParam = year + bindMonth + util.bindDate(e.index + 1);
            var dateParam = {'y':year, 'm':month, 'd':e.index+1, 'bm':bindMonth, 'bd':'', 'bDate':dayParam};
            var oneDayReq = require('ui/common/AppWindow');
            var oneDayWin = new oneDayReq(L('新刊リスト'), 0);
            var dayList   = new dayListReq('day', dateParam);
            oneDayWin.add(dayList.createList());
            ActiveWinTab.tabs.activeTab.open(oneDayWin);
            
        });

        return win1;
    };

    return module.exports = Calender;
})();
