(function() {
    var Detail;
    Detail = function(detailData) {
        Ti.API.info(detailData);

        // 詳細情報を載せるwindow表示(半透明)
        var t = windowAnimation(0);
        var win = Ti.UI.createWindow({
            backgroundColor:'#333333',
            borderWidth:1,
            borderColor:'#666',
            width:"100%",
            height:"100%",
            borderRadius:5,
            opacity:0.92,
            transform:t
        });

        // window開ききったときのアニメーション
        var t1 = windowAnimation(1.1);
        var a = Titanium.UI.createAnimation();
        a.transform = t1;
        a.duration = 200;
        a.addEventListener('complete', function() {
            var eventT = windowAnimation(1.0);
            win.animate({transform:eventT, duration:200});
        });
      
        // タイトル
        titleLabel = Ti.UI.createLabel({
            top : 10,
            font: { fontsize:20, fontWeight: "bold" },
            color:"#ffffff",
            layout:"vertical"
        });
        titleLabel.text = detailData.title;
        win.add(titleLabel);

        // 載せる画像
        if (detailData.is_image === true) {
            imageUrl = "http://images.amazon.com/images/P/" + detailData.asin + ".09._SL200_.jpg";
        } else {
            imageUrl = "/iphone/noimage.jpeg";
        }
        detailImage = Ti.UI.createImageView({
            image:imageUrl,
            width : 150, 
            height : 200,
            top:50,
            layout:"vertical"
        });
        win.add(detailImage);


        var data = [];
        data[0] = Ti.UI.createTableViewRow({title:'購入/予約をする', hasChild:true});
        data[1] = Ti.UI.createTableViewRow({title:'チェックリストに入れる'});
        data[2] = Ti.UI.createTableViewRow({title:'カレンダーに登録する'});
        data[3] = Ti.UI.createTableViewRow({title:'このページを閉じる'});

        var menuTableView = Titanium.UI.createTableView({
            data:data,
            bottom:10,
            left:30,
            right:30,
            height:180,
            borderWidth:1,
            borderRadius:7,
            borderColor:'#999',
            layout:"vertical"
        });
        win.add(menuTableView);

        menuTableView.addEventListener('click', function(e){
            Ti.API.info(e);
            // クローズ
            var eventT = windowAnimation(0);
            win.close({transform:eventT,duration:300});

            // window呼び出し
            var Req = require('ui/common/AppWindow');
            var index = e.index;
            if (index === 0) {
                var Win = new Req(L('新刊詳細'), 0);
                var AmazonDetail = require('ui/AmazonDetail');
                var instacnce = new AmazonDetail(detailData.asin);
                Win.add(instacnce);
                ActiveWinTab.tabs.activeTab.open(Win);

            } else if (index === 1) {
                var Win = new Req(L('チェックリスト'), 0);
                var AmazonDetail = require('ui/AmazonDetail');
                var instacnce = new AmazonDetail(detailData.asin);
                Win.add(instacnce);
                ActiveWinTab.tabs.activeTab.open(Win);

            } else if (index === 2) {
                var Win = new Req(L('カレンダー登録'), 0);
                var AmazonDetail = require('ui/AmazonDetail');
                var instacnce = new AmazonDetail(detailData.asin);
                Win.add(instacnce);
                ActiveWinTab.tabs.activeTab.open(Win);

            } else {
            }

        });

        // windowにクリックしたらクローズ
        win.addEventListener('click', function(){
            var eventT = windowAnimation(0);
            win.close({transform:eventT,duration:300});
        });

        win.open(a);

    };

    var windowAnimation = function(scaleValue) {
        var t = Titanium.UI.create2DMatrix();
        t = t.scale(scaleValue);
        return t;
    }

    return module.exports = Detail;
})();
