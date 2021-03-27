//init code or router

const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('./../models/user');

//middlewaresetup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//routers goes here 
router.all(

    '/',
    function (req, res) {
        return res.json(
            {
                status: true,
                message: "User controller working..."


            }

        );

    }
);

//create new route 


router.post(
    '/createNew',
    [
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail(),

    ],
    function (req, res) {
        //check validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 'Form validation error',
                errors: errors.array()
            });


        }
        //hash data password code 
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        //    return res.json({
        //        status: true,
        //        message: 'USER data status OK',
        //        data: req.body,
        //        hashedPassword :hashedPassword



        //    })
        //create new user model
        var temp = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        //insert data into databse
        temp.save(
            function (error, result) {
                //check error
                if (error) {
                    return res.json({
                        status: false,
                        message: 'DB insert fail..',
                        error: error,
                    });



                }
                //everything ok
                return res.json({
                    status: true,
                    message: 'DB INSERTED SUCCESSFUL',
                    result: result,

                });

            }

        );



    }
);


//find user
router.get('/find/:email',
    function (req, res) {
        //find user document
        User.find({ email: req.params.email },
            function (error, result) {
                //check error
                if (error) {
                    return res.json({
                        status: false,
                        message: 'DB find fail..',
                        error: error,
                    });



                }
                //everything ok
                return res.json({
                    status: true,
                    message: 'DB find SUCCESSFUL',
                    result: result,

                });


            }
        );

    }

);
router.get('/find',
    function (req, res) {
        //find user document
        User.find(
            function (error, result) {
                //check error
                if (error) {
                    return res.json({
                        status: false,
                        message: 'DB find fail..',
                        error: error,
                    });



                }
                //everything ok
                return res.json({
                    status: true,
                    message: 'DB find SUCCESSFUL',
                    result: result,

                });


            }
        );

    }

);

//update user document  using put 
router.put('/update/:email',
    function (req, res) {

        //update user

        User.update(
            { email: req.params.email },
            { username: 'sherryjee' },
            function (error, result) {
                //check email isempty?
                if (req.params.email) {

                    //check error 
                    if (error) {
                        return res.json({
                            status: false,
                            message: 'DB  update fail',
                            error: error,



                        });
                    }
                    //everything ok
                    return res.json({
                        status: true,
                        message: 'DB update  SUCCESSFUL',
                        result: result,

                    });




                }
                else {
                    return  res.json({status: false,
                        message: 'EMAIL NOT PROVIDED...'
                    });
                }

            }


        );

    }

);

router.delete(
    '/delete/:email',
    (req,res)=>{
        //check email not empty 
        if(req.params.email){
            User.remove(
            {email: req.params.email},
            (error,result)=>{
                //check error
                if(error){
                    return res.json({
                        status: false,
                        message: 'DB delete faild...',
                        error: error
                    });
                }
                //ok
                return res.json({
                    status: true,
                    message: 'DB DELETE SUCCESFUL',
                    result: result,
                });

            }

            );
        }
        else 
        {
            //if email not provided
            return res.json({
                status: false,
                message: 'Email not provided'

            });
        }

    }
    
        
    

);

//login controller
// login router for user
router.post(
    '/login',
    [
      // check not empty fields
      check('password').not().isEmpty().trim().escape(),
      check('email').isEmail().normalizeEmail()
    ],
    function(req, res){
      // check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: false,
          message: 'Form validation error.',
          errors: errors.array()
        });
      }
  
      // check email exist or not
      User.findOne(
        { email : req.body.email },
        function(error, result){
          // check error
          if (error){
            return res.json({
              status : false,
              message : 'DB Read Fail...',
              error : error
            });
          }
  
          // result is empty or not
          if ( result ){
            // when result variable contains document
            // match password
            const isMatch = bcrypt.compareSync(req.body.password, result.password);
  
            // check password is match
            if (isMatch){
              // password matched
              return res.json({
                status : true,
                message : 'User exists. Login Success...',
                result : result
              });
            } else {
              // password not matched
              return res.json({
                status : false,
                message : 'Password not matched. Login Fail...',
              });
            }
          } else {
            // user document don't exists
            return res.json({
              status : false,
              message : 'User don\'t exists.'
            });
          }
  
        }
      );
    }
  );
  



//moudle exports
module.exports = router;


