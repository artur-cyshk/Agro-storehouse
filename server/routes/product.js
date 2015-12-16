var connection=require('../config/DBConnection.js');
var async=require('async');
exports.get=function(req,res,next){
	async.waterfall([
    function(callback) {
    	var query='SELECT product_id,product.name,price,description, \
                GROUP_CONCAT(consist.name separator ",") as consists FROM product \
                join product_consist using(product_id)  \
                join consist using(consist_id) \
                where product_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
            console.log(err);
			callback(err, data[0]);
		})
        
    },
    function(product, callback) {
      var query='SELECT GROUP_CONCAT(provider.name separator ",") \
            as providers FROM product \
            join provider_product using(product_id) \
            join provider using(provider_id) \
            where product_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
			if(data[0]){

				product.providers=data[0].providers;
                console.log(product);
			}
			callback(err, product);
		})
    },
    function(product,callback){
         var query='SELECT GROUP_CONCAT(country.name separator ",") \
            as countries FROM product \
            join product_country using(product_id) \
            join country using(country_id) \
            where product_id="'+req.params.id+'"';
        connection.query(query,function(err,data){
            if(data[0]){
                product.countries=data[0].countries;
            }
            callback(err, product);
        })
    }
], function (err, result) {
    if(err){
    	next(err);
    }else{
    	res.status(200).send(result);
    }
});
		
}