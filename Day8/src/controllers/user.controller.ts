import { User } from '../models/user.model'
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { RegisterUserInputs } from '../utils/validation/userRegister'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../config/envConfig'
import { loginInput } from '../utils/validation/userLogin'
import { asyncMiddleware } from '../middleware/asyncMiddleware'

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Hello backend' })
}

export const createUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { full_name, email, password, confirmPassword } = req.body as RegisterUserInputs
  // kiểm tra user đã tồn tại
  const existingUser = await User.findOne({ where: { email } })
  if (existingUser) {
    res.status(409)
    throw new Error('conflic: email already exitsts')
  }
  // mã hóa mật khẩu
  const hashPassword = await bcrypt.hash(password, 10)
  // const hashedPassword = Number(password);

  // tạo user mới
  await User.create({
    full_name,
    email,
    password: hashPassword
  })
  // trả về response
  res.status(201).json({
    success: true,
    message: 'Registered successfully'
  })
})

export const loginUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  // lấy thông tin đăng nhập từ request body
  const { email, password } = req.body as loginInput

  const user = await User.findOne({ where: { email } })
  // kiểm tra xem user có tồn tại không
  if (!user) {
    res.status(404)
    throw new Error('Email does not exist')
  }

  // kiểm tra xem mật khẩu có đúng không
  if (!user.password) return res.status(500).json({ message: 'Password hash not found for this user' })
  // so sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  // tạo và ký JWT token
  const payload: JwtPayload = { id: user.id, role: user.role }

  const token = jwt.sign(payload, config.TOKEN, { expiresIn: '10m' })

  const refreshToken = jwt.sign({ id: user.id, role: user.role }, config.REFRES_TOKEN, {
    expiresIn: '7d'
  })
  res.cookie('refreshToken', refreshToken, { httpOnly: true })

  // trả về response thành công
  res.status(200).json({
    success: true,
    message: 'Login success',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      expiresIn: '10m'
    }
  })
})

// REFRESH TOKEN
export const refreshToken = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' })
  }
  // Verify refresh token
  const decoded: any = jwt.verify(refreshToken, config.REFRES_TOKEN)

  // Generate new access token
  const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, config.TOKEN, { expiresIn: '10m' })
  res.status(200).json({
    success: true,
    token: newAccessToken,
    expiresIn: '10m'
  })
})

export const logoutUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('refreshToken', { httpOnly: true })
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  })
})
