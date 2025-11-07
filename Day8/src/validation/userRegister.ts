import { string, z } from 'zod';
import { validateEmail, validatePasswordMatch, validatePasswordStrength , validatePhone } from './baset';

export const registerUserSchema = z.object({
    full_name: z.string().min(3, 'Name is required'),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    phone : z.string()
    
}).superRefine((data, ctx) => {
    const { email, password, confirmPassword , phone} = data;

    // validate email format
    validateEmail(email, ctx);

    // validate password strength
    validatePasswordStrength(password, ctx);

    // validate password match
    validatePasswordMatch(password, confirmPassword, ctx);
    
    // validate phone 
    validatePhone(phone,ctx)

});
  

export type RegisterUserInputs = z.infer<typeof registerUserSchema>;
