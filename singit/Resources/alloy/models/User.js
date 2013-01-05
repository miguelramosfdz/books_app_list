var moment = require("alloy/moment"), ID = "userinfo", Alloy = require("alloy");

exports.definition = {
    config: {
        url: "http://" + Alloy.CFG.api.host + "/user",
        cache: !1,
        adapter: {
            type: "restapi",
            collection_name: "user"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            setLogin: function(provider, args) {
                this.set("id", ID);
                this.set("provider", provider);
                this.set("user_id", args.user_id);
                this.set("uid", args.uid);
                this.set("name", args.name);
                this.set("login_date", moment().format("YYYY-MM-DD HH:mm:ss"));
                if (provider == "twitter") {
                    this.set("key", args.key);
                    this.set("secret", args.secret);
                }
                this.save();
            },
            logout: function() {},
            isLogin: function() {
                return !_.isEmpty(this.get("uid"));
            },
            getUserId: function() {
                return this.get("user_id");
            },
            getProvider: function() {
                return this.get("provider");
            },
            getName: function() {
                return this.get("name");
            },
            getUid: function() {
                return this.get("uid");
            },
            getKey: function() {
                return this.get("key");
            },
            getSecret: function() {
                return this.get("secret");
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("user", exports.definition, []);

collection = Alloy.C("user", exports.definition, model);

exports.Model = model;

exports.Collection = collection;