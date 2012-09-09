var exports = {
    make:function(calendar, listLine){
             var len = calendar.length;
             var rows= [];
             for(var i=0;i<len;i++){
                 var row = Ti.UI.createTableViewRow({
                     borderWidth:2,
                     layout:"horizontal",
                     height:30
                 });

                var dayLableView = Ti.UI.createView({
                    height:50,
                    width:75,
                    top:5,
                    left:2
                });

                var comicCountLabelView = Ti.UI.createView({
                    height:Ti.UI.SIZE,
                    width:Ti.UI.SIZE,
                    layout:"vertical",
                    top:5,
                    left:2
                });

                 if(calendar[i].day%2===0) {
                     row.backgroundColor = '#fefefe';
                 }else{
                     row.backgroundColor = '#d8d8d8';
                 }
                 var line = Ti.UI.createLabel({
                     backgroundColor: '#999',
                     width:2,
                     height:Ti.UI.SIZE,
                     top:0,
                     left:30,
                     layout:'horizonal'
                 });
                 dayLableView.add(line);

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
                 dayLableView.add(dayLabel);

                 // 曜日
                 var weekLabel = Ti.UI.createLabel({
                     left:20,
                     top:0,
                     font:{
                         fontSize:14
                     },
                     text:'(' + calendar[i].dayNames + ')'
                 });
                 dayLableView.add(weekLabel);

                 // 件数
                 var num = listLine[i+1];
                 var comicCountLabel = Ti.UI.createLabel({
                     top:0,
                     left:5,
                     textAlign:2,
                     font:{fontSize:14},
                     text:'販売件数 : '  + num + '件'

                 });
                 comicCountLabelView.add(comicCountLabel);

                 row.add(dayLableView);
                 row.add(comicCountLabelView);
                 rows.push(row);
             }
             Ti.API.info(row);
             return rows;
         }
}
