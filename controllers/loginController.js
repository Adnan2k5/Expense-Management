const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const loginController = async (req, res) => {
  try {
    let email = req.body.data.username;
    let password = req.body.data.password;
    console.log(email, password);
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(401).send("User not Found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res.status(200).json({ message: "Login", redirectUrl: "/", user: user });
      }
      else{
        res.status(400).json({message: "Invalid Credentials"})
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = loginController;

/*/module.exports.registerUser = async function (req,res,next){
    try{
        
        let email = req.body.Email;
        let fullname = req.body.Username;
        let password = req.body.Password;
        let extuser = await userModel.findOne({email: email});
        if (extuser) return res.status(401).send("User Already Exists");
        bcrypt.genSalt(10, async function(err,salt){
            bcrypt.hash(password,salt, async function(err,hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password: hash
                    })
                    res.status(200).json({message: "Registered, now you can login!", redirectUrl: '/login'});
                };
                
            })
        })

    }catch(err){
        console.log(err.message);
    }
}
/*/
