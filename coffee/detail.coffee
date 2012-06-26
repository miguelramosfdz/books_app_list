(->
    Detail = ->
        @win = Titanium.UI.createWindow
            title: 'detail'
            backgroudColor:'white'
        label = Titanium.UI.createLabel
            text:'detail'
        @win.add(label)
    module.exports = Detail
)()
