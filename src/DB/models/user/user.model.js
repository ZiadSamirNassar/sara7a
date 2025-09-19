import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},

    email: {
        type: String, 
        required: function() {
            return !this.phone;
        },
        // unique: true,
        trim: true
    },

    phone: {
        type: String,
        required: function() {
            return !this.email;
        },
        // unique: true,
        trim: true
    },

    password: {
        type: String, 
        required: function() {
            return this.userAgent === "local";
        }
    },

    isVerified: {
        type: Boolean, 
        default: false
    },

    otp: {
        type: String, 
        default: undefined
    },
    otpExpiry: {
        type: Date, 
        default: undefined
    },

    userAgent: {
        type: String, 
        enum: ["google", "local"],
        default: "local"
    },

    profilePicture: {
        secure_url: String,
        public_id: String
    },

    credentialsUpdatedAt: {
        type: Date,
        default: Date.now
    }
    
},{
    timestamps: true,
    
});

const User = model("User", userSchema);

export default User;