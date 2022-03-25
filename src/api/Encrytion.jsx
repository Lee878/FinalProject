import { keyPassword } from "../config/config";
import CryptoJS from 'crypto-js';
const keyHex = CryptoJS.enc.Utf8.parse(keyPassword);
// eslint-disable-next-line
export default{
     encryptDES(message){
        if (message) {
          let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          return encrypted.ciphertext.toString();
        } else {
          return '';
        }
      },
}