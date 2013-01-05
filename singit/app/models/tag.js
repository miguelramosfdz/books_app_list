var Alloy = require('alloy');

exports.definition = {
	
	config: {
        "url":"http://" + Alloy.CFG.api.host + "/tag",
        "cache": false,
		"adapter": {
			"type": "restapi",
			"collection_name": "tag"
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

