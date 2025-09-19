import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign({payload}, process.env.TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token, secretKey = process.env.TOKEN_SECRET) => {
    return jwt.verify(token, secretKey);
};

