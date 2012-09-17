var exports = {
    exec:function(thisData, getResponseData){
             // データ取得
             var i;
             var listLen = thisData.util.objCount(getResponseData);
             for(i=0;i<listLen;i++){
                 if (i == thisData.day - 1) {
                    thisData.item.badge = getResponseData[i+1];
                 }
             }
         }
}
