var connection=require('../config/DBConnection.js');
var async=require('async');
exports.get=function(req,res,next){
	var query='delete from message where message_id="'+req.params.id+'"';
	connection.query(query,function(err,data){
		if(err){
			next(true);
		}else{
			res.status(200).end();
		}
	})
}