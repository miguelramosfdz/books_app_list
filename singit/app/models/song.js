var Alloy = require('alloy');

exports.definition = {
	
	config: {
        "url":"http://" + Alloy.CFG.api.host + "/song/new",
        "cache": false,
		"adapter": {
			"type": "restapi",
			"collection_name": "song"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			// extended functions go here

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

