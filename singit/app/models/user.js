var moment = require('alloy/moment');

var ID = "userinfo";

var Alloy = require('alloy');

exports.definition = {
	
	config: {
        "url": "http://" + Alloy.CFG.api.host + "/user",
        "cache": false,
		"adapter": {
			"type": "restapi",
			"collection_name": "user"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions go here
            setLogin: function(provider, args) {
                this.set('id', ID);
                this.set('provider', provider);
                this.set('user_id', args.user_id);
                this.set('uid', args.uid);
                this.set('name', args.name);
                this.set('login_date', moment().format('YYYY-MM-DD HH:mm:ss'));

                if (provider == 'twitter') {
                    this.set('key', args.key);
                    this.set('secret', args.secret);
                }

                this.save();
            },
            logout: function() {

            },
            isLogin: function() {
                return ! _.isEmpty(this.get('uid'));
            },
            getUserId: function() {
                return this.get('user_id');
            },
            getProvider: function() {
                return this.get('provider');
            },
            getName: function() {
                return this.get('name');
            },
            getUid: function() {
                return this.get('uid');
            },
            getKey: function() {
                return this.get('key');
            },
            getSecret: function() {
                return this.get('secret');
            }
		}); // end extend

		return Model;
	},
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions go here			
		}); // end extend
		
		return Collection;
	}
}

