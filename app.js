const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const sequelize = require('./util/database');

const User = require('./modules/User');
const cors = require('cors');

const app = express();

app.use(cors());

const userRoutes = require('./routes/user');

app.use(bodyParser.json({extended:false}));

//added routers
app.use('/user',userRoutes);


sequelize.sync().then((response)=>{
    console.log(response);
    app.listen(5000);
}).catch(error=>console.log(error));