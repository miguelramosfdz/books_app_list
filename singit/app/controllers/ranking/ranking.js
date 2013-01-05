// var songs = Alloy.Collections.song;

Alloy.Globals.parent.rightNavButton = $.requestBtn;

function showRequestPage() {
    alert("request");
}

function search() {

    var controller = Alloy.createController('search/search_result', {query: "test"}).getView();
    Alloy.Globals.parent.add(controller);
    // var rect = $.searchView.getRect();

    // Ti.API.debug(rect);
    // $.searchResultView.left = rect.x;
    // $.searchResultView.top = rect.y + rect.height;
    // $.searchResultView.width = rect.width;
    // $.searchResultView.visible = true;
}

var rank = 1;

function songTransform(model) {
    var transform = model.toJSON();
    transform.rank = rank++;
    return transform;
}

function tagTransform(model) {
    var transform = model.toJSON();
    transform.label = transform.name + " (" + transform.tags_count + ")";
    return transform;
}

Alloy.Collections.tag.fetch({data: {limit: 10}});
$.songs.fetch({data: {limit: 10}});
