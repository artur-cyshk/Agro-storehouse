var connection=require('../config/DBConnection.js');
var async=require('async');
exports.post=function(req,res,next){
	async.waterfall([
	    function(callback) {
	    	var query='insert into message (user_id,company_id,message,add_date) VALUES ("'+req.session.user+'","'+
			req.body.companyId+'","'+req.body.commentString+'","'+new Date().toLocaleString()+'")';
			connection.query(query,function(err,data){
				callback(err,data);
			})
	        
	    },
	    function(data,callback){
	    	var query='select message_id,user_id,name,message,add_date from message join user using(user_id) where company_id="'+req.body.companyId+'"'+
	    	' order by add_date DESC';
	    	connection.query(query,function(err,data){
	    		callback(err,data);
	    	})
    	}
	], function (err, result) {
	    if(err){
	    	next(err);
	    }else{
	    	res.status(200).send(result);
	    }
	});

}