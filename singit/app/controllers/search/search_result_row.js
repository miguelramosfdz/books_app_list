var songs = Alloy.Collections.song;
var id;

if ($model) {
    id = $model.get('id');
}

function openSong() {
    var song = songs.get(id);
    alert(song.get("id"));
}
