var exports = exports || this;
exports.request = function(path, method, args) {

    var statusCode = 0;
    this.response   = null;
    this.errorMessage = null;

    // 引数確認
    if (path == null || method == null) {
        return false;
    }

    // オフラインであればアラート表示
    while (!Titanium.Network.online) {
        alert("ネットワークが接続できません");
    }

    /**
     * HTTPステータスコードの取得
     */
    this.getStatusCode = function () {
        return statusCode;
    };

    /**
     * HTTPレスポンスの取得
     */
    this.getResponse = function () {
        return this.response;
    };

    /**
     * エラーメッセージの取得
     */
    this.getErrorMessage = function () {
        return this.errorMessage;
    }

    var options = {};
    options.beforeSend  = args.beforeSend  || function() {};
    options.success     = args.success     || function() {};
    options.error       = args.error       || function() {};
    // options.complete    = args.complete    || function() {};
    options.timeout     = args.timeout     || 5000;
    options.contentType = args.contentType || "application/json; charset=utf-8";
    
    var self = this;
    var url = "http://" + Alloy.CFG.api.host + path;

    var client = Titanium.Network.createHTTPClient({

        /**
         * API接続開始時の処理
         * beforeSend 実行
         */
        onreadystatechange: function() {
            if (this.readyState == client.OPENED) {
                options.beforeSend.call(this);
            }
            // else if (this.read == client.DONE) {
                // options.complete.call(this);
            // }
        },

        /**
         * リクエスト成功時の処理
         * success 実行
         */
        onload: function(e) {
            self.response = this.responseText;
            self.statusCode = this.status;
            options.success.call(this);
        },
        
        /**
         * リクエスト成功時の処理
         * success 実行
         */
        onerror: function(e) {
            statusCode = this.status;
            if (e.error) { self.errorMessage = e.error};
            if (this.responseText) {  }
            options.error.call(this);
        },

        /**
         * HTTPタイムアウト値 (s)
         */
        timeout: options.timeout  // in milliseconds
    });

    client.open(method, url);
    client.setRequestHeader('Content-type', options.contentType);
    client.send(args.params || null);

    return true;
};
