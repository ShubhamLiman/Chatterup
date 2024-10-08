import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String},
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type:String
    },
    joinedRooms:[{
        type:mongoose.Types.ObjectId,
        ref:'Room'
    }],
    createdRooms:[{
        type:mongoose.Types.ObjectId,
        ref:'Room'
    }]
});

export const userModel = new mongoose.model('User',userSchema);