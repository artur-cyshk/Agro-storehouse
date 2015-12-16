var connection=require('../config/DBConnection.js');
var async=require('async');
exports.post=function(req,res,next){
	async.waterfall([
    function(callback){
		var query='select user_id from user where name="'+ req.body.username+'"';
		connection.query(query,function(err,data){
			console.log(err);
			if(err){
				callback(err);
				return;
			}
			if(data.length>0){
				if(data[0].user_id===req.session.user){
					err=null;
				}else{
					err=true;
				}
			}
			callback(err);
		})
    },
    function(callback){
    	var query='update user set name="'+ req.body.username+'"'+
    			' where user_id='+ req.session.user;
		connection.query(query,function(err,data){
			console.log(err);
			callback(err);
		})
    }
	],
	function(err){
		if(err){
			next(true);
			return;
		}
		res.status(200).send(req.body.username);
	});
}