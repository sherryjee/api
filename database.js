//init code



const mongoose=require('mongoose');

//incloude asserts

const assert=require('assert');


const db_url= process.env.DB_URL;

//connection code

mongoose.connect(db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
    },

     function(error,link){
      //  check error
        assert.equal(error,null,'fail');
        console.log('DB CONNECTION SUCCESS...');
    //    console.log(link);



    }
    
    );