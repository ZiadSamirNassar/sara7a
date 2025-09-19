import {messageModel, userModel} from "../../DB/index.js";



export const sendMessage = async (req, res) => {

    const {receiverId} = req.params;
    const {content} = req.body;
    const {files} = req;


    const receiver = await userModel.findById(receiverId);
    if (!receiver) {
        throw new Error("Receiver not found.", { cause: 404 });
    }

    const message = await messageModel.create({
        sender: req.user?.id,
        receiver: receiverId,
        content,
        attachments: files.map((file) => file.path),
    });

    return res.status(201).json({
        success: true,
        message,
    });    
}


export const getMessages = async (req, res) => {

    const {user} = req;

    const messages = await messageModel.find({
        receiver: user.id,
    });
    
    return res.status(200).json({
        success: true,
        messages,
    });
}