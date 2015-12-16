var connection=require('../config/DBConnection.js');
exports.get=function(req,res){
		var query='select * from company order by name';
		connection.query(query,function(err,data){
			if(err){
				next(true);
			}else{
				res.status(200).send(data);
			}
		})
}