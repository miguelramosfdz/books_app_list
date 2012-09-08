var exports = {
    make:function(calendar, listLine){
             var len = calendar.length;
             var rows= [];
             for(var i=0;i<len;i++){
                 Ti.API.info(calendar[i]);
                 var row = Ti.UI.createTableViewRow({
                     borderWidth:1,
                     height:30
                 });

                 if(calendar[i].day%2===0) {
                     row.backgroundColor = '#ededed';
                 }else{
                     row.backgroundColor = '#c6c6c6';
                 }
                 var line = Ti.UI.createLabel({
                     backgroundColor: '#999',
                     width:2,
                     height:Ti.UI.SIZE,
                     top:0,
                     left:30
                 });

                 // 日付
                 var dayLabel = Ti.UI.createLabel({
                     left:0,
                     top:0,
                     textAlign:1,
                     font:{
                         fontSize:14
                     },
                     text:calendar[i].day
                 });

                 // 曜日
                 var weekLabel = Ti.UI.createLabel({
                     left:15,
                     top:0,
                     font:{
                         fontSize:14
                     },
                     text:'(' + calendar[i].dayNames + ')'
                 });

                 // 件数
                 var num = listLine[i+1];
                 var comicCountLabel = Ti.UI.createLabel({
                     top:0,
                     left:50,
                     textAlign:2,
                     font:{fontSize:14},
                     text:'販売件数 : '  + num + '件'

                 });

                 row.add(line);
                 row.add(dayLabel);
                 row.add(weekLabel);
                 row.add(comicCountLabel);
                 rows.push(row);
             }
             return rows;
         }
}
