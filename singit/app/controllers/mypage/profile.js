var userInfo = require('user_info');

Alloy.Globals.parent.rightNavButton = $.saveBtn;

function save() {
    var user = Alloy.createModel('user', {
        id: userInfo.get('id'),
        name: $.name.value,
        description: $.description.value,
        homepage: $.homepage.value,
        like_music: $.likeMusic.value
    });

    user.save(null, {success: function(model, data)  {
        userInfo.setAll(data);
        alert("更新しました");
    }, error: function() {
        alert("失敗しました");
    }});
}

if (userInfo.isLogin()) {
    $.image.image       = userInfo.getImageUrl();
    $.name.value        = userInfo.get('name');
    $.description.value = userInfo.get('description');
    $.homepage.value    = userInfo.get('homepage');
    $.likeMusic.value   = userInfo.get('like_music');
}
