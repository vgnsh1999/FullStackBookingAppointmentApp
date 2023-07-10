const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const sequelize = require('./util/database');

const User = require('./modules/User');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}))

app.post('/user/add-user',async (req,res,next)=>{
    try{
    // console.log('hi')
        const username = req.body.username;
        const phonenumber = req.body.phonenumber;
        const email = req.body.email;
        const data = await User.create({username:username,phonenumber:phonenumber,email:email});
        res.status(201).json({newAddedUser:data})
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

app.get('/user/get-user',async (req,res,next)=>{
    try{
        const users = await User.findAll();
        res.status(200).json({allUsers:users});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

app.delete('/user/delete-user/:id',async(req,res,next)=>{
    try{
        const userID = req.params.id;
        await User.destroy({where:{id:userID}});
        res.sendStatus(200);
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});


sequelize.sync().then((response)=>{
    console.log(response);
    app.listen(5000);
}).catch(error=>console.log(error));