
(function() {
  var Detail;
  Detail = function() {
    var label;
    this.win = Titanium.UI.createWindow({
      title: 'detail',
      backgroudColor: 'white'
    });
    label = Titanium.UI.createLabel({
      text: 'detail'
    });
    return this.win.add(label);
  };
  return module.exports = Detail;
})();
