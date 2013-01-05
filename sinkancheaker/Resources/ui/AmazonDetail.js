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
            enabled:false,
            font:{ fontSize:20 }
        });
        forwardBtn.addEventListener('click', function(){
            if (webView.canGoForward()) {
                webView.goForward();  
            }
        });

        var backBtn = Titanium.UI.createButton({
            title:String.fromCharCode(0x25c2),
            enabled:false,
            font:{ fontSize:20 }
        });
        backBtn.addEventListener('click', function(){
            if (webView.canGoBack()) {
                webView.goBack();  
            }
        });

        webView.addEventListener('load', function(e){
            if (this.canGoForward()) {
                forwardBtn.setEnabled(true);
            } else {
                forwardBtn.setEnabled(false);
            }

            if (this.canGoBack()) {
                backBtn.setEnabled(true);
            } else {
                backBtn.setEnabled(false);
            }

        });


        var flexSpace = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });

        var closeBtn = Titanium.UI.createButton({
            title:'戻る',
            style:Titanium.UI.iPhone.SystemButtonStyle.DONE
        });

        win.setToolbar(
                [backBtn, forwardBtn, flexSpace, closeBtn],
                {animated:false}
                );
        win.add(webView);

        closeBtn.addEventListener('click', function(e) {
            win.animate({bottom:-50, duration:500});
            win.close();
        });

        return win;
    };
    return module.exports = AmazonDetail;
})();

