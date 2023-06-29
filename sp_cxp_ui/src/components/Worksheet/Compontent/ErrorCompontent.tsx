import * as ConstFun from "./../../Constant/ConstantFunction";

export function ErrorMessage(message) {
  if(message){
    if(message.hasOwnProperty('error')){
      // alert(message.error);
      let object = {};
      if(typeof message.details === "string"){
        object = {
          message: message.error,
          type: 'info',
          detail: message.details,
        }
      }else{
        object = {
          message: message.error,
          type: 'info'
        }
      }
      ConstFun.showMessageBox(object);
     }
  }
}
