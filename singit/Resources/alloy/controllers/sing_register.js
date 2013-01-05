function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ApiClient = require("api_client");
    $.win.rightNavButton = $.submitBtn;
    $.win.leftNavButton = $.cancelBtn;
    var submitUserInfo = function() {
        var uid = Titanium.Utils.md5HexDigest(String(Math.random()));
        ApiClient.request("/user", "POST", {
            params: {
                uid: uid,
                provider_id: 1,
                name: $.nameField.value,
                description: $.descriptionField.value,
                homepage: $.homepageField.value,
                like_music: $.likeMusicField.value
            },
            success: function() {
                $.win.close();
            }
        });
    };
    $.submitBtn.on("click", submitUserInfo);
    $.cancelBtn.on("click", function() {
        $.win.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;