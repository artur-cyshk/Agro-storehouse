var connection=require('../config/DBConnection.js');
exports.get=function(req,res,next){
		var query='delete from product_group where product_group_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
			if(err){
				next(true);
			}else{
				res.status(200).end();
			}
		})
}