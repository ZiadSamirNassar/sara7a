
export const generateOtp = () => {
    //5 digits otp
    return Math.floor(10000 + Math.random() * 90000);
}