import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?t=st=1722431562~exp=1722435162~hmac=ea299b45e822d27de13f3be2a97a12edb8de54e6494968ad043cfdc19a1a92f2&w=740"
    },
}, {timestamps: true});

const User=mongoose.model('User',userSchema);
export default User;