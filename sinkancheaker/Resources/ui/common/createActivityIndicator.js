var exports = {
    make:function(navActHashType){
             if (navActHashType == 'start') {
                 var navActHash;
                 // スタート用hash data
                 navActHash = {
                     top:100,
                     height:55,
                     width:'auto',
                     opacity:0.5,
                     color:'#000',
                     backgroundColor:'#ffffff',
                     borderRadius:5,
                     borderColor:'#000',
                     font:{fontFamily:'Helvetica Neue', fontSize:16},
                     message:' 読み込み中...',
                     style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
                 };
             } else {
                 // 更新用hash data
                 navActHash = {
                     bottom:10,
                     height:60,
                     color:'#000',
                     font:{fontFamily:'Helvetica Neue', fontSize:16},
                     message:' 読み込み中...',
                     style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
                 };
             }
             var navActInd = Titanium.UI.createActivityIndicator(navActHash);

             return navActInd;
         }

}
