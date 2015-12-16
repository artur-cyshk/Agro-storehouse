var connection=require('../config/DBConnection.js');
exports.get=function(req,res,next){
		var query='insert into consist (name) VALUES ("'+req.params.name+'")';
		connection.query(query,function(err,data){
			if(err){
				next(true);
			}else{
				res.status(200).end();
			}
		})
}