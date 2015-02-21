
var users = require('../data/users');

module.exports.my1=function(req,res){
   res.render('users/index',{title :'Users',users:users});
};