const router = require('express').Router();
const User = require('../model/User');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require ('../validation');


router.post('/register', async (req, res) => {

    //Validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check for same email
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) =>{

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

     //Check for email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found');

     //If password is correct
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if (!validPass) return res.status(400).send('Invalid Password');


       //Create and assign a token
       const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
       res.header('auth-token', token).send(token); 
   // res.send('Logged in');


 });

 router.get('/profile', (req, res) =>{
     var decoded = jwt.verify(req.headers['authorization'], process.env.TOKEN_SECRET)

     User.findOne({
         _id: decoded._id
     })
     .then(user => {
         if (user){
             res.json(user)
         }else{
             res.send('User does not exist')
         }
     })
     .catch(err =>{
         res.send('error'+ err)
     })
 })

module.exports = router;