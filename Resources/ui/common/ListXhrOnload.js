var exports = {
    exec:function(thisData, getResponseData){
             // データ取得
             var i = 0;
             var listLen = getResponseData.length;
             var createTableList = require('ui/common/createTableVIewList');
             var currentAppendData = [];
             var currentUpdateData = [];

             if (getResponseData != false) {
                 while (i < listLen) {
                     var row = createTableList.make(getResponseData[i]);
                     //var row = {title:'title' + i};
                     if (i == 0) {
                         currentUpdateData.push(row);
                     } else {
                         currentAppendData.push(row);
                     }
                     i++;
                 }

                 // インジゲータ隠す
                 if (thisData.pageNum != thisData.defaultPage) {
                     // １ページ目ではなくかつはじめにきた場合
                     thisData.tableView.updateRow(thisData.lastRow,currentUpdateData[0]);
                     thisData.tableView.appendRow(currentAppendData);
                 } else {
                     currentAppendData.push(currentUpdateData[0]);
                     thisData.tableView.appendRow(currentAppendData);
                 }

                 // limit値まで値を取得できれば次のlimit値の件数分を取得する
                 // (limit値ぴったりの場合でも同様
                 if (i != thisData.limit) {
                     var emptyRow = createTableList.emptyMake();
                     thisData.tableView.appendRow(emptyRow);
                 } else {
                     thisData.updating = false;
                 }

             }  else {

                 var emptyRow = createTableList.emptyMake();

                 if (thisData.pageNum != thisData.defaultPage) {
                     thisData.tableView.updateRow(thisData.lastRow, emptyRow);
                 } else {
                     thisData.tableView.appendRow(emptyRow);
                 }
                 thisData.updating = true;

             }
             thisData.pageNum += 1;
             thisData.navActInd.hide();
         }
}
