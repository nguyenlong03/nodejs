import * as UserRepository from '../repositorys/user.repository'
import bcrypt from 'bcrypt'
import { RegisterUserInputs } from '../validation/userRegister'
import { loginInput } from '../validation/userLogin'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../config/env.config'

export const createUser = async (data: RegisterUserInputs) => {
  const { full_name, email, password, phone } = data
  const hashPassword: string = await bcrypt.hash(password, 10)
  const user = await UserRepository.creatUser(full_name, email, hashPassword, phone)
  return user
}

export const loginUser = async (data: loginInput) => {
  const { email, password } = data
  const user = await UserRepository.loginUser(email)
  if (!user) {
    throw new Error('email not fount')
  }
  if (!user.password) {
    throw new Error('Password hash not found for this user')
  }
  // so sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unauthorized')
  }
  const payload: JwtPayload = { id: user.id, role: user.role }
  const token = jwt.sign(payload, config.TOKEN, { expiresIn: '10m' })
  const refreshToken = jwt.sign(payload, config.REFRES_TOKEN, { expiresIn: '7d' })
  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      expiresIn: '10m'
    }
  }
}

export const RefreshToken = (refreshToken : string)=>{
    if (!refreshToken) {
    throw new Error ("refreshToken not fount")
  }
  // Verify refresh token
  const decoded: any = jwt.verify(refreshToken, config.REFRES_TOKEN)
  // Generate new access token
  const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, config.TOKEN, { expiresIn: '10m' })
  return {
    token: newAccessToken,
    expiresIn: '10m'
  }
}
