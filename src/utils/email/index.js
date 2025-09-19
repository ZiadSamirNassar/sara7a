import {OTPTemplate} from "./email.page.js";
import nodemailer from "nodemailer";

const sendEmail = async ({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "sara7a <ziadnassar565@gmail.com>",
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};


export const sendOtpMail = async (email, otp) => {
    await sendEmail({
        to: email,
        subject: "Otp Verification",
        html: OTPTemplate(otp),
    });
};
