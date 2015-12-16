var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
		var query='insert into product (name,price,description,product_group_id) VALUES ("'+req.body.name+'","'+
			req.body.price+'","'+req.body.description+'","'+req.body.group_id+'")';
		connection.query(query,function(err,data){
			console.log(err);
			if(err){
				if(err.code==='ER_DUP_ENTRY'){
					res.status(400).end();
					return;
				}	
				next(true);
			}else{
				res.status(200).send(req.body);
			}
		})
}