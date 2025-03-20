const express = require('express');
const bcrypt = require('bcrypt.js');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const router = express.Router();

router.post('/register', async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'User already exists'});
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        user = new User({name,email,password:hashedPass});
        await User.save();
    }
    catch(e){
        res.status(500).json({message: 'Server error', e})
    }
});

module.exports = router;
