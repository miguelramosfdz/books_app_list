globals = {}
do->
    Top = require('Top')
    top = new Top()

    globals.tabGroup = Titanium.UI.createTabGroup()
    tab = Titanium.UI.createTab
        window: top.win
        title:'hoge'
    globals.tabGroup.addTab(tab)
    globals.tabGroup.addEventListener "focus", (e) ->
            globals.currentTab = e.tab
    globals.tabGroup.open()
