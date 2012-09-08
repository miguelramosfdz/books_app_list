var exports = {
    makeAuthStr:function(){
        var username = 'shinkan';
        var pass = 'checker';
        var authstr = 'Basic ' + Titanium.Utils.base64encode(username+':'+pass);

        return authstr;
    }
}
