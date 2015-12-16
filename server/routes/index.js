var express = require('express');
var router = express.Router();
router.get('/userById',require('./userById').get);
router.get('/storehouse/:id',require('./storehouse').get);
router.get('/company/:id',require('./company').get);
router.get('/product/:id',require('./product').get);
router.get('/deleteGroup/:id',require('./deleteGroup').get);
router.get('/deleteCompany/:id',require('./deleteCompany').get);
router.post('/addCompany',require('./addCompany').post);
router.post('/addProduct',require('./addProduct').post);
router.post('/addGroup',require('./addGroup').post);
router.post('/addStorehouse',require('./addStorehouse').post);
router.post('/addEmployee',require('./addEmployee').post);
router.post('/editProduct',require('./editProduct').post);
router.get('/addCountry/:name',require('./addCountry').get);
router.get('/addProvider/:name',require('./addProvider').get);
router.get('/addConsist/:name',require('./addConsist').get);

router.get('/deleteCountry/:id',require('./deleteCountry').get);
router.get('/deleteProvider/:id',require('./deleteProvider').get);
router.get('/deleteConsist/:id',require('./deleteConsist').get);


router.get('/companies',require('./companies').get);
router.get('/getItems',require('./getItems').get);
router.get('/deleteEmployee/:id',require('./deleteEmployee').get);
router.get('/deleteProduct/:id',require('./deleteProduct').get);
router.post('/changeUsername',require('./changeUsername.js').post);
router.post('/changePassword',require('./changePassword.js').post);
router.post('/login',require('./login.js').post);
router.post('/registration',require('./registration.js').post);
router.get('/logout',require('./logout.js').get);
router.get('/authorized',require('./authorized.js').get);
router.post('/addComment',require('./addComment.js').post);
router.get('/deleteComment/:id',require('./deleteComment.js').get);
router.get('/deleteStorehouse/:id',require('./deleteStorehouse.js').get);
router.post('/checkUsernames',require('./checkUsernames.js').post);
module.exports=router;