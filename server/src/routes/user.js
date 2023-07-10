const router = require('express').Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {upload, resizeImage} = require('../middlewares/uploadImages');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//Route-1: Register a new user
router.post('/register',upload.any('image') ,async(req, res)=>{

    try {
        const result = await resizeImage(req.files[0].path);

        const {name, email, password} = req.body;
        //checking if email already exist in database
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                status: 'failure',
                message: 'This email already exist.'
            })
        }
        //generating the hash of the password
        const hash = await bcrypt.hash(password, 10);
        //creating new user
        user = await User.create({
            name, email, 'password': hash, 'profilePic': result.url
        });

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            message: error.message
        })
    }
})

//Route-3: Logging in a existing user
router.post('/login', async(req, res)=>{

    try {
        const {email, password} = req.body
        console.log(email, password)
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                status: 'failure',
                message: 'user does not exist, please register'
            })
        }

        //checking if password and hash matches
        const result = await bcrypt.compare(password, user.password)
        if(!result){
            return res.status(401).json({
                status: 'failure',
                message: 'username and password does not match!'
            })
        }
        //generating a token
        const token = jwt.sign({
            data: user._id
        }, JWT_SECRET, {
            expiresIn: '1d'
        })
        return res.status(200).json({
            status: 'success',
            message: 'successfully logged in.',
            id: user._id , 
            profile: user.profilePic,
            token
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            message: error.message
        })
    }
})

module.exports = router;