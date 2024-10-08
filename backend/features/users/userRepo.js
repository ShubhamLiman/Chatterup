import { userModel } from "./userSchema.js"
export const regUser = async(data) =>{
    try{
        const user = await userModel(data);
        const savedUser = await user.save();
        return {success:true,message:"User Registration Successful"};
    }catch(err){
        if (err.name === 'MongoServerError' && err.code === 11000) {
            // Duplicate email error
            return {success:false,message:"Email alredy exists"};
        } else {
            // Other error
            return {success:false,message:'Internal Server Error' };
        }
    }
}

export const loginUser = async(email,password) =>{
    try{
        const user = await userModel.findOne({email,password}).select('-password');
        // const userinfo = user.select('name email')
        if(!user){
            return {success:false,message:"Invalid Credentials"};
        }else{
            return {success:true,message:"Login Successful",useri:user};
        }
    }catch(err){
        console.log(err);
        return {success:false,message:"something went wrong"};
    }
}