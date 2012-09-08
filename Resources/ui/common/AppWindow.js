(function() {
    var AppWindow;
    AppWindow = function(title, navHiddenFlag) {
        var self = Ti.UI.createWindow({
            title:title,
            barColor:'#000000',
            backgroundColor:'#ffffff'
        });

        self.addEventListener('focus', function(e){
            ActiveWinTab.activeWindow = self;
        });

        return self;
    };
    return module.exports = AppWindow;

})();
