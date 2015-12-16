var connection=require('../config/DBConnection.js');
var async=require('async');
exports.get=function(req,res,next){
    async.parallel([
        function(callback){
           var query='select * from country';
           connection.query(query,function(err,data){
                callback(err,data);
           })
        },
        function(callback){
           var query='select * from provider';
           connection.query(query,function(err,data){
                callback(err,data);
           })
        },
        function(callback){
           var query='select * from consist';
           connection.query(query,function(err,data){
                callback(err,data);
           })
        },
    ],
    // optional callback
    function(err, results){
        if(err){
            return next(true);
        }
        res.status(200).send(results);
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
    });

}