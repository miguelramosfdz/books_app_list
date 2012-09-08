(function() {
    var AmazonDetail;
    AmazonDetail = function(asin) {
        var win = Ti.UI.createView();
        var amazonPage = 'http://www.amazon.co.jp/dp/'+asin+'/';
        var webView = Ti.UI.createWebView({
            url:amazonPage
        });
        win.add(webView);
        return win;
    };
    return module.exports = AmazonDetail;
})();

