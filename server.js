/*This will be the starting file of the project.
This file will be responsible for creating the server
and connecting to the database.*/

const express =  require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const server_config = require('./configs/server.config');
const db_config = require('./configs/db.config');
const user_model = require('./models/user.model');

app.use(express.json());

//create an admin user at the start of the server, if it does not exist

//connect to the database
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;
db.on('error', ()=>{
    console.log('Error connecting to the database');
})
db.once('open', ()=>{
    console.log('Connected to the database');
    init()
})

async function init(){

    try{
        let user = await user_model.findOne({userType: 'ADMIN'});

        if(user){
            console.log('Admin user already exists');
            return;
        }
    }catch(err){
        console.log('Error creating admin user', err);    
    }

    try{
        user = await user_model.create({
            name: 'Danish',
            userId: 'admin',
            email: 'syedd924@gmail.com',
            userType: 'ADMIN',
            password: bcrypt.hashSync('admin123', 8)
        })
        console.log('Admin user created successfully', user);
        
    }catch(err){
        console.log('Error creating admin user');
    }
}

//stitch the routes

require('./routes/auth.routes')(app);

//start the server
app.listen(server_config.PORT, () => {
    console.log(`Server is running on port ${server_config.PORT}`);
});