import express from "express";
import bcrypt from "bcrypt";
import User from "../models/web.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const getdata = async (req, res) => {
  try {
   const users = await User.findAll({
      attributes: { exclude: ['password', 'refresh_token', 'reset_token'] } // bỏ các cột nhạy cảm
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  // kiểm tra user đã tồn tại
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "User đã tồn tại" });
  }
  // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
  // const hashedPassword = Number(password);

  // tạo user mới
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // trả về response
  try {
    res.status(201).json({
      message: "Đăng ký thành công",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đăng ký không thành công", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login data:", req.body);

    // 1️ Kiểm tra username có tồn tại không
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // 2️ Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // 3️ Tạo token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // 4️ Tạo refresh token (sống lâu)
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // 7 ngày
    );
    user.refresh_token = refreshToken;
    await user.save();
    await user.update({ refresh_token: refreshToken });

    // 5 Trả về kết quả
    res.json({
      message: "Đăng nhập thành công!",
      token,
      refreshToken,
      // user: {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   role: user.role,
      // },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body; // client gửi refresh token qua body
    if (!refreshToken)
      return res.status(401).json({ message: "Thiếu refresh token" });

    // kiểm tra refresh token có tồn tại trong DB không
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user)
      return res.status(403).json({ message: "Refresh token không hợp lệ" });

    // xác thực refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Refresh token đã hết hạn hoặc không hợp lệ" });

      // tạo access token mới
      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );

      res.json({
        message: "Tạo access token mới thành công!",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error("Lỗi refresh token:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
// quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    await user.update({ reset_token: resetToken });

    const resetLink = `http://localhost:7000/resetpassword?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Đặt lại mật khẩu - BookStore",
      html: `
        <h3>Xin chào ${user.username}</h3>
        <p>Nhấn vào liên kết dưới đây để đặt lại mật khẩu:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Đã gửi email đặt lại mật khẩu" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
//đặt lại mật khẩu
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user || user.reset_token !== token)
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc hết hạn" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword, reset_token: null });

    res.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Khi người dùng click link trong email → hiển thị form đổi mật khẩu
export const showResetForm = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res
      .status(400)
      .send("<h2>Liên kết không hợp lệ hoặc đã hết hạn!</h2>");
  }

  // Hiển thị form HTML đơn giản
  res.send(`
    <form action="/resetpasssword" method="POST">
      <input type="hidden" name="token" value="${token}" />
      <h3>Nhập mật khẩu mới</h3>
      <input type="password" name="newPassword" placeholder="Mật khẩu mới" required />
      <button type="submit">Đặt lại mật khẩu</button>
    </form>
  `);
};
