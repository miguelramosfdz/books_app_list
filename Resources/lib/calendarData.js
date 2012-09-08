var exports = {
    make:function(year, month){
             var months = [31, 28 + leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
             var dayNames = ['sun','mon','tue','wed','thu','fri','sat'];
             var rows = [];
             for (var day = 1; day <= months[month-1]; day++){
                 var dayOfWeek = (new Date(year, month, day, 0, 0, 0)).getDay();
                 var row = {
                     dayNames:dayNames[dayOfWeek],
                     day:day
                 };
                 rows.push(row);
             }
             return rows;

         }
};

function leap(year){
    return year % 4 ? 0 : year % 100 ? 1 : year % 400 ? 0 : 1;
}

function make_cal_array(year){
    var months = [31, 28 + leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var result = [];
    for (var m = 0; m < 12; m++){
        result[m] = [];
        var dofw1 = (new Date(year, m, 1, 0, 0, 0)).getDay();
        for (var d = 1; d <= months[m]; d++){
            result[m][d + dofw1 - 1] = d;
        }
    }
    return result;
}

