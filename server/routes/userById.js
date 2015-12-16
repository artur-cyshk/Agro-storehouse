var connection=require('../config/DBConnection.js');
exports.get=function(req,res,next){
	if(req.session.authorized){
		var query='select * from user where user_id='+req.session.user;
		connection.query(query,function(err,data){
			console.log(err);
			if(err){
				next(true);
			}else{
				res.status(200).send(data[0]);
			}
		})
	}else{
		res.status(401).end();
	}
}