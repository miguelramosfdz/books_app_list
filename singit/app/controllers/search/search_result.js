var args = arguments[0] || {};
var songs = Alloy.Collections.song

songs.on('fetch', function() {
    $.header.text = "「" + args.query +"」の検索結果 " + this.length + "件"; 
});

songs.fetch();
