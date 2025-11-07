
import { NextFunction, Request, Response } from 'express'
import * as UserSevies from '../services/user.servies'


export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Hello backend' })
}

export const createUser =async (req: Request, res: Response, next: NextFunction) => {
  await UserSevies.createUser(req.body )
  res.status(201).json({
    success: true,
    message: 'Registered successfully'
  })
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
   const dataUser = await UserSevies.loginUser(req.body)
  res.cookie("refreshToken" , dataUser.refreshToken)
  res.status(200).json({ message : "Login success", dataUser
  })
}

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken
  const refreshTokenUser = UserSevies.RefreshToken(refreshToken)
  res.status(200).json({
    success: true,
    refreshTokenUser
    
  })
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('refreshToken', { httpOnly: true })
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  })
}
