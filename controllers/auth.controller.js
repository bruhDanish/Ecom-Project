//logic to register a user

const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");


exports.signup = async (req, res) => {
    //logic to create a user

    //1. read the request body
    const request_body  = req.body;

    //2. insert the user into the database
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    };

    try{
        const user_created = await user_model.create(userObj)
        //return the user
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }
        res.status(201).send(res_obj);
    }catch(err){
        console.log('Error while creating user', err);
        res.status(500).send({
            message: 'Error while registering the user'
        });
    }

    //3. return the response
}

exports.signin = async (req, res) => {
    //check if the userId is present in the database
    const user = await user_model.findOne({userId: req.body.userId})
    if(!user){
        return res.status(400).send({
            message: 'User not found'
        })
    }

    //if password is correct
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if(!passwordIsValid){
        return res.status(401).send({
            message: 'Invalid password'
        })
    }

    //generate a token using jwt
    const token = jwt.sign({id: user.userId}, secret.secret, {
        expiresIn: 1200
    });

    res.status(200).send({
        message: 'User logged in successfully',
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}