var mysql=require('mysql');
var app=require('../../app.js');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '99996578'
});
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  connection.query('use agrostorehousedb',function(err,data){
  	if(err) return next();
  	console.log('Connection established');
  })
  
});
module.exports=connection;