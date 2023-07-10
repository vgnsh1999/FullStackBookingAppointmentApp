const User = require('../modules/User');

const addUser = async (req,res,next)=>{
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
}

const getUser = async (req,res,next)=>{
    try{
        const users = await User.findAll();
        res.status(200).json({allUsers:users});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        const userID = req.params.id;
        await User.destroy({where:{id:userID}});
        res.sendStatus(200);
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
}

module.exports = {
    addUser,
    getUser,
    deleteUser
};