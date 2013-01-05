var exports = exports || this;

exports.request = function(path, method, args) {
    var statusCode = 0;
    this.response = null;
    this.errorMessage = null;
    if (path == null || method == null) return !1;
    while (!Titanium.Network.online) alert("ネットワークが接続できません");
    this.getStatusCode = function() {
        return statusCode;
    };
    this.getResponse = function() {
        return this.response;
    };
    this.getErrorMessage = function() {
        return this.errorMessage;
    };
    var options = {};
    options.beforeSend = args.beforeSend || function() {};
    options.success = args.success || function() {};
    options.error = args.error || function() {};
    options.timeout = args.timeout || 5000;
    options.contentType = args.contentType || "application/json; charset=utf-8";
    var self = this, url = "http://" + Alloy.CFG.api.host + path, client = Titanium.Network.createHTTPClient({
        onreadystatechange: function() {
            this.readyState == client.OPENED && options.beforeSend.call(this);
        },
        onload: function(e) {
            self.response = this.responseText;
            self.statusCode = this.status;
            options.success.call(this);
        },
        onerror: function(e) {
            statusCode = this.status;
            e.error && (self.errorMessage = e.error);
            !this.responseText;
            options.error.call(this);
        },
        timeout: options.timeout
    });
    client.open(method, url);
    client.setRequestHeader("Content-type", options.contentType);
    client.send(args.params || null);
    return !0;
};