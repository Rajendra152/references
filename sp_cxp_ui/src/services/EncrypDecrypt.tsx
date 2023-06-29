var CryptoJS = require("crypto-js");
const SECRETE_KEY = "inpixionXV2021"



export const encrypt = (data: any) => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRETE_KEY).toString();

    return ciphertext
}

export const decrypt = (ciphertext: any) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext.substr(1,ciphertext.length-2), SECRETE_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData);

    return decryptedData
}


export const fileOpen = async (props: any) => {
    console.log("-------------")
    try {
        const pickerOpts = {
            types: [
              {
                description: 'SigmaPlot Notebook (*.JNBx)',
                accept: {
                  'JNBx/*': ['.JNbx']
                }
              },
            ],
            excludeAcceptAllOption: true,
            multiple: false
          };
        let [fileHandle] = await window.showOpenFilePicker(pickerOpts);
        console.log(fileHandle)
        const file = await fileHandle.getFile();
        const decData = decrypt(await file.text())
        console.log(decData); 
        return decData
    }
    catch(e){
        console.log(e)
        if(e.code ==20){
            return {code:e.code, message: e.message}
        }
        return {code:500, message: 'File Not supported'}
    }
    
}

export const fileOpenWithPath = async (path: any) => {
    var fs = require('fs')
    try{
        let decrData= fs.readFileSync(path , 'utf8');
        const decData = decrypt(decrData)
        return decData
    }
    catch(e){
        return {code:e.code, message:e.message}
    }
}
