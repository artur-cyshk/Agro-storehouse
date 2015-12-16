var connection=require('../config/DBConnection.js');
var async=require('async');
exports.get=function(req,res,next){
	async.waterfall([
    function(callback) {
    	var query='select * from company where company_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
			callback(err, data);
		})
        
    },
    function(company, callback) {
      var query='select employee_id,name,role,entry_date from employee where company_id="'+req.params.id+'"';
		connection.query(query,function(err,data){
			if(data){
				company.push(data);
			}
			callback(err, company);
		})
    },
    function(company,callback){
    	var query='select message_id,user_id,name,message,add_date from message join user using(user_id) where company_id="'+req.params.id+'"'+
    	' order by add_date DESC';
    	connection.query(query,function(err,data){
    		if(data){
    			company.push(data);
    		}
    		callback(err,company);
    	})
    },
    function(company,callback){
        var query='select storehouse_id,storehouse.name as storehouse_name,address from storehouse where company_id="'+req.params.id+'"';
        connection.query(query,function(err,data){
            if(data){
                company.push(data);
            }
            callback(err,company);
        })
    },
    function(company,callback){
        var query='select storehouse_id,city.name as city_name,city_id,building_date from storehouse \
                join city_storehouse using(storehouse_id) \
                join city using(city_id) where company_id="'+req.params.id+'"';
        connection.query(query,function(err,data){
            if(data){
                company.push(data);
            }
            callback(err,company);
        })
    },
    function(company,callback){
        var query='select * from city';
        connection.query(query,function(err,data){
            if(data){
                company.push(data);
            }
            callback(err,company);
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