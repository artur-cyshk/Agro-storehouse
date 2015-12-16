var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
		console.log(req.body);
		var query='UPDATE product set name="'+req.body.name+'", price="'+req.body.price+'",description="'+req.body.description+'" where product_id='+
		req.body.product_id;
		connection.query(query,function(err,data){
			var query='INSERT into product_country (product_id,country_id) VALUES ("'+req.body.product_id+'","'+req.body.country+'")';
			connection.query(query,function(err,data){
				var query='INSERT into product_consist (product_id,consist_id) VALUES ("'+req.body.product_id+'","'+req.body.consist+'")';
				connection.query(query,function(err,data){
					var query='INSERT into provider_product (product_id,provider_id) VALUES ("'+req.body.product_id+'","'+req.body.provider+'")';
					connection.query(query,function(err,data){
						res.status(200).end();
					})
				})
			})
		})
}