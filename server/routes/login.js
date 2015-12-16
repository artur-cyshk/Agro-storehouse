var connection=require('../config/DBConnection.js');
var encrypt=require('../config/encrypt.js');
exports.post=function(req,res,next){
	if(!req.body.username){
		next(true);
		return;
	}
	var query='select * from user where name="'+ req.body.username+'"';
	connection.query(query,function(err,data){
		if(err){
			next(true);
			return;
		}
		if(data.length>0){
			if(encrypt(req.body.password)==data[0].password){
				req.session.user=data[0].user_id;
				req.session.authorized=true;
				req.session.role=data[0].role;
				res.status(200).end();
			}else{
				res.status(400).send({'error':'incorrectPassword'});
			}
		}else{
			res.status(400).send({'error':'incorrectUsername'});
		}
	})
}