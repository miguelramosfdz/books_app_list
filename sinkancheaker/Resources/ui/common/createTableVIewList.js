var exports = {
    make:function(list){
         var labelView, dateLabel, imageUrl, imageView, nameLabel, row, authorLabel, priceLabel, title, cateLabel, publisherNameLabel;
         row = Ti.UI.createTableViewRow({
             height: Ti.UI.SIZE,
             width: Ti.UI.SIZE,
             layout: "horizontal",
             bottom:5,
             className:'list',
             poolData:{
                 title:list.title,
                 asin:list.asin,
                 is_image:list.is_image
             }
         });

         // 作品画像
         if (list.is_image === true) {
             imageUrl = "http://images.amazon.com/images/P/" + list.asin + ".09._SL75_.jpg";
         } else {
             imageUrl = "./images/noimage.jpeg";
         }
         imageView = Ti.UI.createImageView({
             image: imageUrl,
             width: 50,
             height: 75,
             top: 5,
             left:2
         });


         // 作品情報分のview生成
         labelView = Ti.UI.createView({
             height:Ti.UI.SIZE,
             width :Ti.UI.SIZE,
             className:'labellist',
             layout: "vertical",
             top: 5,
             left:1
         });

         // 作品名
         nameLabel = Ti.UI.createLabel({
                left:5,
             className:'label',
                font:{ fontSize:16 },
              color: "#2b4771"
         });
         if (list.title.length > 15) {
             title = list.title.substr(0, 15) + '…';
         } else {
             title = list.title;
         }
         nameLabel.text = title;

         // 発売日
         dateLabel = Ti.UI.createLabel({
             left:5,
             className:'label',
             font:{ fontSize: 12 }
         });
         dateLabel.text = '発売日:' + list.publication_date;

         // 著者
         authorLabel = Ti.UI.createLabel({
             left:5,
             className:'label',
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

         // 値段
         priceLabel = Ti.UI.createLabel({
             left:5 ,
             className:'label',
             font:{ fontSize: 12 }
         });
         priceLabel.text = '値段:' + list.price + '円';

         // 出版社
         publisherNameLabel = Ti.UI.createLabel({
             left:5,
             className:'label',
             font:{ fontSize: 12 }
         });
         publisherNameLabel.text = '出版社:' + list.publisher_name;

         // 書籍のタイプ
         cateLabel = Ti.UI.createLabel({
             left:5,
             className:'label',
                   font:{ fontSize: 12 }
         });
         if (String(list.node_id).length >= 10) {
             cateLabel.text = '漫画';
         } else {
             cateLabel.text = 'ラノベ・小説';
         }

         labelView.add(nameLabel);
         labelView.add(dateLabel);
         labelView.add(authorLabel);
         labelView.add(priceLabel);
         labelView.add(publisherNameLabel);
         labelView.add(cateLabel);
         row.add(imageView);
         row.add(labelView);
         return row;
    },

    emptyMake:function() {

      var row = Ti.UI.createTableViewRow({
          height: 60,
          width: Ti.UI.SIZE,
          className:'noImage'
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
