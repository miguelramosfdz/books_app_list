(function() {
    var AmazonDetail;
    AmazonDetail = function(asin) {

        var AppWindow = require('ui/common/AppWindow');
        var win = new AppWindow('詳細', false);

        var amazonPage = 'http://www.amazon.co.jp/dp/'+asin+'/';
        var webView = Ti.UI.createWebView({
            url:amazonPage
        });

        var forwardBtn = Titanium.UI.createButton({
            title:String.fromCharCode(0x25b8),
            font:{ fontSize:14 }
        });
        forwardBtn.addEventListener('click', function(){
            webView.goForward();  
        });

        var backBtn = Titanium.UI.createButton({
            title:String.fromCharCode(0x25c2),
            font:{ fontSize:14 }
        });
        backBtn.addEventListener('click', function(){
            webView.goBack();  
        });

        var flexSpace = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });

        var closeBtn = Titanium.UI.createButton({
            title:'戻る',
            style:Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        closeBtn.addEventListener('click', function(e) {
            win.close();
        });

        win.setToolbar([backBtn, forwardBtn, flexSpace, closeBtn]);
        win.add(webView);
        return win;
    };
    return module.exports = AmazonDetail;
})();

