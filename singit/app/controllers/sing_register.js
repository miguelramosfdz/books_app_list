var ApiClient = require('api_client');

$.win.rightNavButton = $.submitBtn;
$.win.leftNavButton = $.cancelBtn;

var submitUserInfo = function() {

    var uid =  Titanium.Utils.md5HexDigest(String(Math.random()));
    ApiClient.request("/user", "POST", {
        params: {
            uid: uid,
            provider_id: 1 ,
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

$.submitBtn.on('click', submitUserInfo);

$.cancelBtn.on('click',function() {
    $.win.close();
});
