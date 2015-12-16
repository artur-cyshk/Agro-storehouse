var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
		var query='insert into product_group (storehouse_id,name,classification_code) VALUES ("'+req.body.storehouse_id+'","' +req.body.name+'","'+
			req.body.code+'")';
		connection.query(query,function(err,data){
			if(err){
				if(err.code==='ER_DUP_ENTRY'){
					res.status(400).end();
					return;
				}	
				next(true);
			}else{
				res.status(200).end();
			}
		})
}