const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
require('dotenv').config();
const router = express.Router();

router.post('/register', async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'User already exists'});
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        user = new User({name,email,password:hashedPass});
        await user.save();
        res.status(201).json({message:'User registered successfully'});
    }
    catch(e){
        res.status(500).json({message: 'Server error', e})
    }
});
//Login
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:'Invalid credential'});

        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(404).json({message:'Invalid credential'});

        //Generate JWT token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token, user:{id:user._id,name: user.name,email:user.email}});

    }
    catch(err){ 
        res.status(500).json({message:'Server error', err})
    }
})

module.exports = router;
