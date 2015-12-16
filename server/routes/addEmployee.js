var connection=require('../config/DBConnection.js');
exports.post=function(req,res,next){
		req.body.employee.entry_date=new Date(req.body.employee.entry_date).toLocaleDateString();
		var query='insert into employee (company_id,name,entry_date,role) VALUES ("'+req.body.company_id+'","' +req.body.employee.name+'","'+
			req.body.employee.entry_date+'","'+req.body.employee.role+'")';
		connection.query(query,function(err,data){
			if(err){
				next(true);
			}else{
				res.status(200).send(req.body.employee);
			}
		})
}