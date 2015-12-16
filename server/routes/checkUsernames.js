var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
	var query='select user_id from user where name="'+ req.body.username+'"';
	connection.query(query,function(err,data){
		if(err){
			next(true);
			return;
		}
		if(data.length>0){
			res.status(200).end();
		}else{
			next(true);
		}
	})
}