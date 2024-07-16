const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');



const saltRounds = 10;

const registerController = async (req,res)=>{
    try{
        let {email,password,name} = req.body.data;
        console.log(req.body);
        const extuser = await userModel.findOne({email: email});
        if(!extuser){
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                if(err) return res.json({message: err});
                else{
                    let user = await userModel.create({
                        name,
                        email,
                        password: hash
                    })
                    res.status(200).json({message: "User Registered", redirectUrl: '/'});
                }
            });
        }
        else{
            res.status(401).json({message: "User Exists"});
        }
        
    }
    catch(error){
        res.status(401).json({success:false,error});
    }
};



module.exports = registerController;