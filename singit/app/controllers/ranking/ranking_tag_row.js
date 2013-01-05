var tags = Alloy.Collections.tag;
var id;

if ($model) {
    id = $model.get('id');
}

function tagClick() {
    var tag = tags.get(id);
    alert(tag.get("name"));
}
