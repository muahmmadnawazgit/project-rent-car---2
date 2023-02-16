var mysql=require('mysql');
var dotenv=require('dotenv');
dotenv.config({path:'../.env'});

var con=mysql.createConnection({
host:process.env.DATABASE_HOST,
user:process.env.DATABASE_USER,
password:process.env.DATABASE_PASSWORD,
database:process.env.DATABASE
});

con.connect(function(err){
    if (err) throw err;
    console.log('connection created');
})

module.exports=con;

