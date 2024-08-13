import * as CryptoJS from "crypto-js";

const key = CryptoJS.enc.Latin1.parse("t700#umsF@db0705");
const iv = CryptoJS.enc.Latin1.parse("i700#umsF@db0705");

export const encrypt = (value) => {
  return CryptoJS.AES.encrypt(value, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
};

export const decrypt = (value) => {
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
