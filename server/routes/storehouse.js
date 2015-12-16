var connection=require('../config/DBConnection.js');
var async=require('async');
exports.get=function(req,res,next){
	async.waterfall([
	    function(callback){
			var query='select  product_group_id,classification_code,name as group_name from product_group \
			 where storehouse_id='+req.params.id+' order by product_group.name';
			connection.query(query,function(err,data){
				callback(err,data);
			})
	    },
	    function(groups,callback){
	    	var query='select product_id,product.product_group_id as group_id ,product.name as product_name,price,description from product \
	    		 join product_group using(product_group_id) where storehouse_id='+req.params.id;
	    	connection.query(query,function(err,data){
	    		console.log(data);
	    		if(err) callback(err);
	    		groups=groups.map(function(group){
	    			var productArr=[];
	    			if(data){
		    			data=data.map(function(product){
		    				if(product.group_id===group.product_group_id){
		    		 			productArr.push(product);
		    		 		}
		    		 		return product;
		    		 	})
	    		 	}
	    		 	group.products=productArr;
	    		 	return group;
	    		})
	    		callback(null,groups);
	    	})
	    }
		],
		function(err,result){
			if(err){
				next(true);
				return;
			}
			res.status(200).send(result);
		});
}
