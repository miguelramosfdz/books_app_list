(->
    Top = ->
        Titanium.UI.setBackgroundColor('white')
        @win = Titanium.UI.createWindow
            title:'book app'
            backgroudColor:'#000'
        data = []
        currentResData = []
        tableView = Ti.UI.createTableView(data: data)
        xhr = Ti.Network.createHTTPClient()
        url = "http://test.comic.co.jp/api/comics.json"
        xhr.open "GET", url
        xhr.onload = ->
            listLine = JSON.parse(@responseText)
            currentResData = ListLine listLine
            tableView.setData currentResData
        xhr.send()
        @win.add(tableView)
            #label = Titanium.UI.createLabel
            #text:'hoge'
            #label.addEventListener('click',
            #(e) ->
            #    Detail = require('detail')
            #    windetail = new Detail()
            #    globals.currentTab.open(windetail.win)
            #)
            #@win.add(label)
    module.exports = Top

    ListLine = (listLine) ->
        currentData = []
        i = 0
        while i < listLine.length
            list = listLine[i]
            row = Ti.UI.createTableViewRow(
                height: Ti.UI.SIZE 
                layout: "vertical"
            )
            imageUrl = "http://images.amazon.com/images/P/" + list.asin + ".09._SL75_.jpg"
            imageView = Ti.UI.createImageView(
                image: imageUrl
                top: 5
                left: 5
            )
            row.add imageView
            nameLabel = Ti.UI.createLabel(
                width: Ti.UI.SIZE 
                height: Ti.UI.SIZE 
                left: 58
                top: 0 
                fontSize: 6
                fontWeight:"bold"
                color: "#2b4771"
            )
            nameLabel.text = list.title
            row.add nameLabel
            dateLabel =  Ti.UI.createLabel(
                width: Ti.UI.SIZE 
                height: Ti.UI.SIZE 
                left: 58
                top: 5
                fontSize: 6
            )
            dateLabel.text = list.publication_date
            row.add dateLabel
            currentData.push row
            i++
        currentData

)()
