var Alloy = require("alloy");

exports.definition = {
    config: {
        url: "http://" + Alloy.CFG.api.host + "/song/new",
        cache: !1,
        adapter: {
            type: "restapi",
            collection_name: "song"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("song", exports.definition, []);

collection = Alloy.C("song", exports.definition, model);

exports.Model = model;

exports.Collection = collection;