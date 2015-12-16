var connection=require('../config/DBConnection.js');
var async=require('async');
exports.post=function(req,res,next){
	async.waterfall([
    function(callback){
		var query='insert into storehouse (name,address,company_id) VALUES ("'+req.body.storehouse.name+'","'+
			req.body.storehouse.address+'","'+req.body.company_id+'")';
		connection.query(query,function(err,data){
			callback(err);
		})
    },
    function(callback){
		var query='select MAX(storehouse_id) as id from storehouse ';
		connection.query(query,function(err,data){
			callback(err,data[0].id);
		})
    },
    function(id,callback){
    	var queries=[];
    	for(var i=0;i<req.body.storehouse.city.length;i++){
    		var query='insert into city_storehouse (city_id,storehouse_id,building_date) VALUES ("'+
    		req.body.storehouse.city[i]+'","'+id+'","'+new Date().toLocaleDateString()+'")';
			connection.query(query,function(err){
				if(err) next(true);
			})
    	}
    	callback(null);
    },
    function(callback){
    	var result=[];
        var query='select storehouse_id,storehouse.name as storehouse_name,address from storehouse where company_id="'+req.body.company_id+'"';
        connection.query(query,function(err,data){
        	if(data){
        		result.push(data);
        	}
            callback(err,result);
        })
    },
    function(result,callback){
        var query='select storehouse_id,city.name as city_name,city_id,building_date from storehouse \
                join city_storehouse using(storehouse_id) \
                join city using(city_id) where company_id="'+req.body.company_id+'"';
        connection.query(query,function(err,data){
            if(data){
                result.push(data);
            }
            callback(err,result);
        })
    },
	],
	function(err,result){
		if(err){
			next(true);
			return;
		}
		res.status(200).send(result);
	});
}