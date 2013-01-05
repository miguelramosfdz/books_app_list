var exports = exports || this;

exports.Twitter = function(global) {
    function createAuthWindow() {
        var self = this, oauth = this.oauthClient, webViewWindow = Ti.UI.createWindow({
            title: this.windowTitle
        }), webView = Ti.UI.createWebView(), loadingOverlay = Ti.UI.createView({
            backgroundColor: "black",
            opacity: 0.7,
            zIndex: 1
        }), actInd = Titanium.UI.createActivityIndicator({
            height: 50,
            width: 10,
            message: "Loading...",
            color: "white"
        }), closeButton = Ti.UI.createButton({
            title: this.windowClose
        }), backButton = Ti.UI.createButton({
            title: this.windowBack
        });
        this.webView = webView;
        webViewWindow.leftNavButton = closeButton;
        actInd.show();
        loadingOverlay.add(actInd);
        webViewWindow.add(loadingOverlay);
        webViewWindow.open({
            modal: !0
        });
        webViewWindow.add(webView);
        closeButton.addEventListener("click", function(e) {
            webViewWindow.close();
            self.fireEvent("cancel", {
                success: !1,
                error: "The user cancelled.",
                result: null
            });
        });
        backButton.addEventListener("click", function(e) {
            webView.goBack();
        });
        webView.addEventListener("beforeload", function(e) {
            isAndroid || webViewWindow.add(loadingOverlay);
            actInd.show();
        });
        webView.addEventListener("load", function(event) {
            if (event.url.indexOf(self.authorizeUrl) === -1) {
                webViewWindow.remove(loadingOverlay);
                actInd.hide();
                webViewWindow.leftNavButton !== backButton && (webViewWindow.leftNavButton = backButton);
            } else {
                webViewWindow.leftNavButton !== closeButton && (webViewWindow.leftNavButton = closeButton);
                var pin = event.source.evalJS("document.getElementById('oauth_pin').getElementsByTagName('code')[0].innerText");
                if (!pin) {
                    webViewWindow.remove(loadingOverlay);
                    actInd.hide();
                } else {
                    isAndroid || webViewWindow.close();
                    oauth.accessTokenUrl = "https://api.twitter.com/oauth/access_token?oauth_verifier=" + pin;
                    oauth.fetchAccessToken(function(data) {
                        Ti.API.info(data.text);
                        var datas = data.text.split("&"), user_id = null, screen_name = null;
                        for (var i in datas) {
                            tmp = datas[i].split("=");
                            tmp[0] == "user_id" ? user_id = tmp[1] : tmp[0] == "screen_name" && (screen_name = tmp[1]);
                        }
                        self.fireEvent("login", {
                            success: !0,
                            error: !1,
                            accessTokenKey: oauth.getAccessTokenKey(),
                            accessTokenSecret: oauth.getAccessTokenSecret(),
                            user_id: user_id,
                            screen_name: screen_name
                        });
                        self.authorized = !0;
                        isAndroid && webViewWindow.close();
                    }, function(data) {
                        self.fireEvent("login", {
                            success: !1,
                            error: "Failure to fetch access token, please try again.",
                            result: data
                        });
                    });
                }
            }
        });
    }
    var K = function() {}, isAndroid = Ti.Platform.osname === "android", jsOAuth = require("./jsOAuth"), Twitter = function(options) {
        var self;
        this instanceof Twitter ? self = this : self = new K;
        options || (options = {});
        self.windowTitle = options.windowTitle || "Twitter Authorization";
        self.windowClose = options.windowClose || "Close";
        self.windowBack = options.windowBack || "Back";
        self.consumerKey = options.consumerKey;
        self.consumerSecret = options.consumerSecret;
        self.authorizeUrl = "https://api.twitter.com/oauth/authorize";
        self.accessTokenKey = options.accessTokenKey;
        self.accessTokenSecret = options.accessTokenSecret;
        self.authorized = !1;
        self.listeners = {};
        self.accessTokenKey && self.accessTokenSecret && (self.authorized = !0);
        options.requestTokenUrl = options.requestTokenUrl || "https://api.twitter.com/oauth/request_token";
        self.oauthClient = jsOAuth.OAuth(options);
        return self;
    };
    K.prototype = Twitter.prototype;
    Twitter.prototype.authorize = function() {
        var self = this;
        if (this.authorized) setTimeout(function() {
            self.fireEvent("login", {
                success: !0,
                error: !1,
                accessTokenKey: self.accessTokenKey,
                accessTokenSecret: self.accessTokenSecret
            });
        }, 1); else {
            createAuthWindow.call(this);
            this.oauthClient.fetchRequestToken(function(requestParams) {
                var authorizeUrl = self.authorizeUrl + requestParams;
                self.webView.url = authorizeUrl;
            }, function(data) {
                self.fireEvent("login", {
                    success: !1,
                    error: "Failure to fetch access token, please try again.",
                    result: data
                });
            });
        }
    };
    Twitter.prototype.request = function(path, params, headers, httpVerb, callback) {
        var self = this, oauth = this.oauthClient, url;
        path.match(/^https?:\/\/.+/i) ? url = path : url = "https://api.twitter.com/" + path;
        oauth.request({
            method: httpVerb,
            url: url,
            data: params,
            headers: headers,
            success: function(data) {
                callback.call(self, {
                    success: !0,
                    error: !1,
                    result: data
                });
            },
            failure: function(data) {
                callback.call(self, {
                    success: !1,
                    error: "Request failed",
                    result: data
                });
            }
        });
    };
    Twitter.prototype.logout = function(callback) {
        var self = this;
        this.oauthClient.setAccessToken("", "");
        this.accessTokenKey = null;
        this.accessTokenSecret = null;
        this.authorized = !1;
        callback();
    };
    Twitter.prototype.addEventListener = function(eventName, callback) {
        this.listeners = this.listeners || {};
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(callback);
    };
    Twitter.prototype.fireEvent = function(eventName, data) {
        var eventListeners = this.listeners[eventName] || [];
        for (var i = 0; i < eventListeners.length; i++) eventListeners[i].call(this, data);
    };
    return Twitter;
}(this);