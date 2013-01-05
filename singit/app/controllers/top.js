var userInfo = require('user_info');

$.win.on('focus', function() {

});

$.singBtn.on('click', function() {
    if (!userInfo.isLogin()) {
        userInfo.showLoginForm();
    } else { 
        var controller = Alloy.createController('sing').getView();
        Alloy.Globals.parent.add(controller);
    }
});

$.listenBtn.on('click', function() {
    var controller = Alloy.createController('ranking/ranking').getView();
    Alloy.Globals.parent.add(controller);
});
