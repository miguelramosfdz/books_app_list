(function() {
    var ToolBar;
    ToolBar = function(closeBtn, backBtn,forwardBtn,title, barTitle) {
        var flexSpace = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE

        });
       
        if (backBtn != '' && forwardBtn != '') {
            itemsData = [closeBtn, flexSpace,barTitle,flexSpace,backBtn,flexSpace,forwardBtn];
        } else if (closeBtn == '') {
            itemsData = [flexSpace,barTitle,flexSpace];
        } else {
            itemsData = [closeBtn, flexSpace,barTitle,flexSpace];
        }

        var toolBar = Ti.UI.iOS.createToolbar({
            items: itemsData,
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
