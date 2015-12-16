var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
		req.body.date=new Date(req.body.date).toLocaleString();
		var query='insert into company (name,entry_date,description) VALUES ("'+req.body.name+'","'+
			req.body.date+'","'+req.body.description+'")';
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