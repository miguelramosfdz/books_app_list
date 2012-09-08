var exports = {
    createUrl: function(type,params){
                   Ti.API.info(params);
        if (type === 'search') {
           var url = 'http://shinkanchecker.com/comics/search.json?'
                + 'utf8=%E2%9C%93&search%5Btitle_or_authors_or_publisher_name_contains%5D=' + params.query
                + '&commit=Search'
                + '&page=' + params.page;

        } else if (type === 'calender') {
            var url = 'http://shinkanchecker.com/comics/count.json?'
                + 'year=' + params.year + '&month=' + params.month;
                Ti.API.info(params);

        } else {
            var url = 'http://shinkanchecker.com/comics.json?'
                + 'date=' + params.date
                + '&page=' + params.page;

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
    }

}
