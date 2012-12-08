var exports = {
    make:function(list){
         var dateLabel, imageUrl, imageView, list, nameLabel, row, authorLabel, priceLabel, title;
         row = Ti.UI.createTableViewRow({
             height: Ti.UI.SIZE,
             width: Ti.UI.SIZE,
             layout: "horizontal",
             bottom:5,
             poolData:{
                 title:list.title,
                 authors:list.authors,
                 price:list.price,
                 publication_date:list.publication_date,
                 asin:list.asin,
                 is_image:list.is_image,
                 node_id:list.node_id,
                 publisher_name:list.publisher_name
             }
         });

         // 作品画像
         if (list.is_image === true) {
             imageUrl = "http://images.amazon.com/images/P/" + list.asin + ".09._SL75_.jpg";
         } else {
             imageUrl = "./iphone/noimage.jpeg";
         }
         imageView = Ti.UI.createImageView({
             image: imageUrl,
             width: 50,
             height: 75,
             top: 5,
             left:2
         });
         row.add(imageView);

         // 作品情報分のview生成
         labelView = Ti.UI.createView({
             height:Ti.UI.SIZE,
             width :Ti.UI.SIZE,
             layout: "vertical",
             top: 5,
             left:1
         });

         // 作品名
         nameLabel = Ti.UI.createLabel({
             left:5, 
                   font:{ fontSize:16 },
                   color: "#2b4771"
         });
         if (list.title.length > 15) {
             title = list.title.substr(0, 15) + '…';
         } else {
             title = list.title;
         }
         nameLabel.text = title;
         labelView.add(nameLabel);

         // 発売日
         dateLabel = Ti.UI.createLabel({
             left:5, 
             font:{ fontSize: 12 }
         });
         dateLabel.text = '発売日:' + list.publication_date;
         labelView.add(dateLabel);

         // 著者
         authorLabel = Ti.UI.createLabel({
             left:5, 
             font:{ fontSize: 12 }
         });
         if (list.authors !== '') {
             if (list.title.length > 50) {
                 var cutAuth = list.authors.substr(0, 50) + '…';
                 authorLabel.text = '著者:' + cutAuth;
             } else {
                 authorLabel.text = '著者:' + list.authors;
             }
         } else {
             authorLabel.text = "著者：著者情報なし";
         }
         labelView.add(authorLabel);

         // 値段
         priceLabel = Ti.UI.createLabel({
             left:5, 
             font:{ fontSize: 12 }
         });
         priceLabel.text = '値段:' + list.price + '円';
         labelView.add(priceLabel);

         // 書籍のタイプ
         cateLabel = Ti.UI.createLabel({
             left:5, 
                   font:{ fontSize: 12 }
         });
         if (String(list.node_id).length >= 10) {
             cateLabel.text = '漫画';
         } else {
             cateLabel.text = 'ラノベ・小説';
         }
         labelView.add(cateLabel);

         row.add(labelView);

         return row;
    },

    emptyMake:function() {

      var row = Ti.UI.createTableViewRow({
          height: 60,
          width: Ti.UI.SIZE,
      });
      var emptyLabel = Ti.UI.createLabel({
          font:{fontFamily:'Helvetica Neue', fontSize:16},
          color: "#2b4771"
      });
      emptyLabel.text = ' 結果なし';
      row.add(emptyLabel);

      return row;
    }

}
