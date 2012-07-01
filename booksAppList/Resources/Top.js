
(function() {
  var ListLine, Top;
  Top = function() {
    var currentResData, data, tableView, url, xhr;
    Titanium.UI.setBackgroundColor('white');
    this.win = Titanium.UI.createWindow({
      title: 'book app',
      backgroudColor: '#000'
    });
    data = [];
    currentResData = [];
    tableView = Ti.UI.createTableView({
      data: data
    });
    xhr = Ti.Network.createHTTPClient();
    url = "http://test.comic.co.jp/api/comics.json?start_date=20120620&end_date=20120620";
    xhr.open("GET", url);
    xhr.onload = function() {
      var listLine;
      listLine = JSON.parse(this.responseText);
      currentResData = ListLine(listLine);
      return tableView.setData(currentResData);
    };
    xhr.send();
    return this.win.add(tableView);
  };
  module.exports = Top;
  return ListLine = function(listLine) {
    var currentData, dateLabel, i, imageUrl, imageView, list, nameLabel, row;
    currentData = [];
    i = 0;
    while (i < listLine.length) {
      list = listLine[i];
      row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        layout: "vertical"
      });
      imageUrl = "http://images.amazon.com/images/P/" + list.asin + ".09._SL75_.jpg";
      imageView = Ti.UI.createImageView({
        image: imageUrl,
        top: 5,
        left: 5
      });
      row.add(imageView);
      nameLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 58,
        top: 0,
        fontSize: 6,
        fontWeight: "bold",
        color: "#2b4771"
      });
      nameLabel.text = list.title;
      row.add(nameLabel);
      dateLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 58,
        top: 5,
        fontSize: 6
      });
      dateLabel.text = list.publication_date;
      row.add(dateLabel);
      currentData.push(row);
      i++;
    }
    return currentData;
  };
})();
