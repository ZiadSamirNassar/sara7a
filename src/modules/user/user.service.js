import {userModel, tokenModel} from "../../DB/index.js";
import cloudinary from "../../utils/cloud/cloudinary.config.js";
import fs from "fs";

export const deleteProfile = async (req, res) => {
    //get user id from req
    const userId = req.user.id;
    //find user and delete
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error("User not found", { cause: 404 });
    }
    
    //send response
    res.status(200).json({
        message: "User deleted successfully",
        success: true
    });
};


export const uploadProfileImage = async (req, res) => {
    //delete old profile picture if it exists
    if (req.user.profilePicture && fs.existsSync(req.user.profilePicture) ) {
        fs.unlinkSync(req.user.profilePicture);
    }
    //get user id from req
    const userId = req.user.id;
    //find user and update
    const updatedUser = await userModel.findByIdAndUpdate(userId, {profilePicture: req.file.path}, {new: true});
    if (!updatedUser) {
        throw new Error("User not found", { cause: 404 });
    }
    //send response
    res.status(201).json({
        message: "Profile picture updated successfully",
        success: true
    });
};

export const uploadProfileCloudImage = async (req, res) => {

    //get user id from req
    const user = req.user;

    //delete old profile picture if it exists
    if (user.profilePicture.public_id) {
        cloudinary.uploader.destroy(user.profilePicture.public_id);
    }



    //upload to cloudinary
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder: `sara7a/users/${user.id}/profile`}
    );


    //find user and update
    const updatedUser = await userModel.findByIdAndUpdate( {_id: user.id}, {profilePicture: {secure_url, public_id}}, {new: true});
    if (!updatedUser) {
        throw new Error("User not found", { cause: 404 });
    }
    //send response
    res.status(200).json({
        data: {secure_url, public_id},
        message: "Profile picture updated successfully",
        success: true
    });
};

export const logout = async (req, res) => {
    //get user id from req
    const token = req.headers.authorization;
    //save token to db
    await tokenModel.create({
        userId: req.user.id,
        token,
    });
    //send response
    res.status(200).json({
        message: "User logged out successfully",
        success: true
    });
};