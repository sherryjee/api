//init code

require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();

const port=process.env.PORT || 4000;
//import database
const database=require('./database');

const UserController=require('./Controller/userController');






//middleware


app.use(morgan('dev'));
app.use(cors());
app.use('/api/user',UserController);



//default routes


app.all(
'/',
function(req,res){
    return  res.json({
        status:true,
        message :'Index page working...'


    });
//res.dend("masg send")


});

//start server 
app.listen(
    port,
    function(){

        console.log(`Server running at port ${port}:`);

    }
)




