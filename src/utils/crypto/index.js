import CryptoJS from "crypto-js";

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET).toString();
};

export const decrypt = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
};