var exports = {
    createUrl: function(type,params){
        switch(type) {
        case 'search' :
           var url = 'http://shinkanchecker.com/comics/search.json?'
                + 'utf8=%E2%9C%93&search%5Btitle_or_authors_or_publisher_name_contains%5D=' + params.query
                + '&commit=Search'
                + '&page=' + params.page;
           break;
        case 'calender' :
            var url = 'http://shinkanchecker.com/comics/count.json?'
                + 'year=' + params.year + '&month=' + params.month;
            break;
        case 'dashboard' :
            var url = 'http://shinkanchecker.com/comics/count.json?'
                + 'year=' + params.year + '&month=' + params.month;
            break;
        case 'setting' :
            var url = 'http://shinkanchecker.com/user/create.json';
            break;
        case 'bookmark' :
            var url = 'http://shinkanchecker.com/user/list.json?'
                + 'uid=' + params.uid
                + '&provider=' + params.provider
                + '&page=' + params.page 
                + '&limit=' + params.limit;
            break;
        default :
            var url = 'http://shinkanchecker.com/comics.json?'
                + 'date=' + params.date
                + '&page=' + params.page
                + '&limit=' + params.limit;
            break;
        }
        return url;
    },

    getDate: function(type) {
        var date  = new Date();
        var year  = date.getFullYear();
        var month = date.getMonth() + 1;
        var day  = date.getDate();

        var bindMonth = this.bindDate(month);
        var bindDay   = this.bindDate(day);

        if (type == 'day') {
            var date      = year + bindMonth + bindDay;
        } else {
            var date      = year + bindMonth;
        }

        var params = {
            'y':year,
            'd':day,
            'm':month,
            'bm':bindMonth,
            'bd':bindDay,
            'bDate':date
        };
        return params;
    },

    bindDate: function(date) {
        if (date < 10) {
            return "0" + date;
        } else {
            return "" + date;
        }
    },

    nextDay: function(year, month, day) {
        var dt = new Date(year,month,0);
        var lastDay = dt.getDate();
        if (day == lastDay) {
            if (month == 12) {
                year++;
                month = 1;
            } else {
                month++;
            }
            day = 1;
        } else { 
            day++;
        }

        var bindMonth = this.bindDate(month);
        var bindDay   = this.bindDate(day);
        var resDate = {'y':year, 'bm':bindMonth, 'bd':bindDay, 'm':month, 'd':day};

        return resDate;
    },

    backDay: function(year, month, day) {
        if (day == 1) {
            if (month == 1) {
                year--;
                month = 12;
            } else {
                month--;
            }
            var dt = new Date(year,month,0);
            day = dt.getDate();
        } else { 
            day--;
        }

        var bindMonth = this.bindDate(month);
        var bindDay   = this.bindDate(day);
        var resDate = {'y':year, 'bm':bindMonth, 'bd':bindDay, 'm':month, 'd':day};

        return resDate;
    },

    nextMonth: function(year, month) {
        if (month == 12) {
           year++;
           month=1;
        } else {
           month++;
        }

        var bindMonth = this.bindDate(month);
        var resDate = {'y':year, 'bm':bindMonth, 'm':month};

        return resDate;
    },

    backMonth: function(year, month) {
        if (month == 1) {
           year--;
           month=12;
        } else {
           month--;
        }
        var bindMonth = this.bindDate(month);
        var resDate = {'y':year, 'bm':bindMonth, 'm':month};

        return resDate;
    },

    objCount: function(obj) {
        var cnt = 0;
        for (var key in obj) {
            cnt++;
        }
        return cnt;
    },

    getTimeOut: function(page) {
        switch (page) {
        case 'list' :
        case 'setting' :
        case 'search' :
        case 'calender' :
        case 'dashboard' :
        case 'bookmark' :
            return 10000;
            break;
        default : 
            return 5000;
            break;
        }

    },

    exeXhr: function(thisData, url, method, page) {

        var returnRes = null;

        if (page === 'setting') {
            var errorTitle = 'ログイン失敗しました';
        } else {
            var errorTitle = 'ネットワークエラー';
        }

        var Auth = require('lib/Auth');

        var xhr = Ti.Network.createHTTPClient();
        xhr.timeout = this.getTimeOut(page);
        xhr.open(method, url);

        var authstr = Auth.makeAuthStr();
        xhr.setRequestHeader('Authorization', authstr);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function(e) {

            var listLine = JSON.parse(this.responseText);

            switch(page) {
            case 'list' :
                var ListXhrOnloadReq = require('ui/common/ListXhrOnload');
                ListXhrOnloadReq.exec(thisData, listLine);
                break;
            case 'search': 
                var ListXhrOnloadReq = require('ui/common/ListXhrOnload');
                ListXhrOnloadReq.exec(thisData, listLine);
                break;
            case 'calender':
                var CalenderXhrOnloadReq = require('ui/common/CalenderXhrOnload');
                CalenderXhrOnloadReq.exec(thisData, listLine);
                break;
            case 'dashboard':
                var DashboardXhrOnloadReq = require('ui/common/DashboardXhrOnload');
                DashboardXhrOnloadReq.exec(thisData, listLine);
                break;
            case 'bookmark':
                var DashboardXhrOnloadReq = require('ui/common/BookmarkXhrOnload');
                DashboardXhrOnloadReq.exec(thisData, listLine);
                break;
            default:
                break;
            }
        };
        xhr.onerror = function(e) {
            thisData.navActInd.hide();
            Ti.API.debug(e);
            Ti.UI.createAlertDialog({
                title:errorTitle,
                message:'時間を置いて試してください',
                buttonName:['OK']
            }).show();
        }
        if (method === 'POST') {
            xhr.send(thisData);
        } else {
            xhr.send();
        }
    }
}
