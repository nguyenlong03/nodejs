import {  RefinementCtx, regex } from 'zod'
// addIssue thêm lỗi thủ công
export const validateEmail = (email: string, ctx: RefinementCtx) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) {
    ctx.addIssue({
      code: 'custom',
      message: ' invalid email ',
      path: ['email']
    })
  }
}
export const validatePasswordStrength = (password: string, ctx: RefinementCtx) => {
  // có tối thiểu 1 chữ cái , và 1 số
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  if (!strongPassword.test(password)) {
    ctx.addIssue({
      code: 'custom',
      message: 'have at least 1 letter and 1 number !',
      path: ['password']
    })
  }
}

export const  validatePasswordMatch = (password: string,confirmPassword:string , ctx: RefinementCtx) => {  
    if(password !== confirmPassword){
        ctx.addIssue({
            code:"custom",
            message: "passwords must match!",
            path : ["confirmPassword"]
        })
    }


}

export const validtaLogin = (password:string  , ctx : RefinementCtx)=>{

  if(!password || password.trim()===''){
 ctx.addIssue({
            code:"custom",
            message: "Password cannot be blank!",
            path : ["password"]
        })
  }
}

export const validatePhone =(phone : string , ctx:RefinementCtx)=>{
  const strongPhone = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5|8|9]|9[0-9])[0-9]{7}$/
 if ( !strongPhone.test(phone)) {
  ctx.addIssue({
      code: 'custom',
      message: 'Invalid phone number format. Must be a valid Vietnamese number!',
      path: ['phone']
    })
 }
}