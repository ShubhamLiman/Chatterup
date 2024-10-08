
import jwt from "jsonwebtoken"
import { regUser,loginUser } from "./userRepo.js";
export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;
    const user = await regUser({name,email,password});
    if(user.success){
        res.status(201).send(user);
    }else{
        res.status(400).send(user);
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;
    const user = await loginUser(email,password);
    if(user.success){
        const token = jwt.sign({ _id: user.useri._id }, process.env.JWT_SECRET , {
            expiresIn: "1h",
          });
          res
            .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
            .send({ success: true, msg: "user login successful", token });
    }else{
        res.status(400).send(user);
    }
}
export const userLoggedin = (req,res) =>{
    const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401).send({ success: false, msg: "Unauthorized" });
  }else{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach the user to the request
        res.send({ success: true, msg: "user logged in successfully" });
    
      } catch (err) {
         res.status(401).send({ success: false, msg: "Session ended" });
      }
  }

 
}
export const userLogout = (req, res, next) => {
    res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
  };