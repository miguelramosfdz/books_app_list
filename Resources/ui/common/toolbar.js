(function() {
    var ToolBar;
    ToolBar = function(backBtn,forwardBtn,title, barTitle) {
        var flexSpace = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE

        });
        var toolBar = Ti.UI.iOS.createToolbar({
            items:[flexSpace,barTitle,flexSpace,backBtn,flexSpace,forwardBtn],
            top:0,
            left:0,
            height:0,
            borderTop: true,
            borderBottom: false,
            translucent: true,
            barColor:'#333333'

        });
        return toolBar;
    };

    return module.exports = ToolBar;
})();
