function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "jp.singit.login.facebook/" + s : s.substring(0, index) + "/jp.singit.login.facebook/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.loginBtn = A$(Ti.UI.createButton({
        size: Ti.UI.SIZE,
        top: 10,
        left: 20,
        right: 20,
        title: "Facebookでログイン",
        id: "loginBtn"
    }), "Button", null);
    $.addTopLevelView($.__views.loginBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    for (var k in args) ;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;