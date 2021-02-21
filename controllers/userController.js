const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");


exports.add_user = async (req, res, next) => {
    try{
        const { userName, passWord, passWordCheck, email } = req.body
        if(!userName || !passWord || !passWordCheck || !email) {
          return res
          .status(400)
          .json({msg: "Not all fields have been entered."})
        }
        if(passWord.length < 5) {
          return res
          .status(400)
          .json({msg: "Password needs to be at least 5 characters long"})
        }
        if(passWord !== passWordCheck) {
          return res
          .status(400)
          .json({msg: "Passwords do not match"})
        }
        const existingUser = await userModel.findOne({userName:userName})
        if(existingUser) {
          return res
          .status(400)
          .json({msg: "UserName already taken"})
        }
        const existingEmail = await userModel.findOne({email: email})
        if(existingEmail) {
          return res
          .status(400)
          .json({msg: "email already taken"})
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(passWord, salt);
        let user = new userModel(
          {
            userName: userName,
            passWord: passwordHash,
            email: email
          }
        )
        
        user.save( await function(err) {
          if(err) {return next(err)}
          console.log('user added to db')
        })
      } catch(err) {
        res.status(500);
        console.log(err)
      }
}

exports.login = async (req, res, next) => {
    try{
      const user = await userModel.findOne({userName: req.body.userName.trim()})
      if(user === null) {
      return res.status(400).send('Cannot find user').end()
    }
       if( await bcrypt.compare(req.body.passWord, user.passWord.trim())) {
         return res
        .send({user})
        .status(200)
        
      } else {
        res.status(500)
        res.send('Not allowed')
      }
    }catch(err) {
      console.log(err)
    }
  }