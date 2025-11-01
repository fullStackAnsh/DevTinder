import isEmail from "validator/lib/isEmail.js";
export const validateSignup = (req) => {
    const {firstName,lastName,emailId,password} = req;
  
    if(!firstName || !lastName){
        throw new Error("Please enter firstName and lastName");
    }
    if(!isEmail(emailId)){
        throw new Error("Please enter valid email");
    }
    if(!password){
        throw new Error("Please enter password");
    }
   
    

}