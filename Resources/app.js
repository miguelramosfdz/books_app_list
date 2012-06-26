var globals;

globals = {};

(function() {
  var Top, tab, top;
  Top = require('Top');
  top = new Top();
  globals.tabGroup = Titanium.UI.createTabGroup();
  tab = Titanium.UI.createTab({
    window: top.win,
    title: 'hoge'
  });
  globals.tabGroup.addTab(tab);
  globals.tabGroup.addEventListener("focus", function(e) {
    return globals.currentTab = e.tab;
  });
  return globals.tabGroup.open();
})();
