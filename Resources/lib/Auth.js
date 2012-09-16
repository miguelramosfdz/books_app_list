var exports = {
    makeAuthStr:function(){
        var username = Ti.App.Config.basicAuth.username;
        var pass     = Ti.App.Config.basicAuth.pass;
        var authstr = 'Basic ' + Titanium.Utils.base64encode(username+':'+pass);

        return authstr;
    }
}
