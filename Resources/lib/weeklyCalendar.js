var exports = {
    make:function(/*array*/ calendar){
             var len = calendar.length;
             var rows= [];
             for(var i=0;i<len;i++){
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
                     width:1,
                     height:30,
                     top:0,
                     left:30
                 });
                 var dayLabel = Ti.UI.createLabel({
                     width:30,
                     height:30,
                     left:0,
                     top:0,
                     textAlign:1,
                     font:{
                         fontSize:14
                     },
                     text:calendar[i].day
                 });
                 //row.add(dayNamesLabel);
                 row.add(line);
                 row.add(dayLabel);
                 rows.push(row);
             }
             return rows;
         }
}
