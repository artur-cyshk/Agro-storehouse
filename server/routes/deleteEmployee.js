var connection=require('../config/DBConnection.js');
exports.get=function(req,res,next){
		req.body.date=new Date(req.body.date).toLocaleString();
		var query='delete from employee where employee_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
			if(err){
				next(true);
			}else{
				res.status(200).end();
			}
		})
}