import express from 'express';
import { data } from '../Data/Mockdata.js';



// middleware để khi nào clinet lấy data thì nó mới đến cái tạo user
// export const checkUser = (req, res, next) => {
//   const { name, age } = req.body;
//   if (!name || !age) {
//     return res.status(400).json({ message: "Thiếu thông tin người dùng" });
//   }
//   next();
// }

// lấy user
export const getData = (req, res) => {
  res.status(200).json(data);
}

const checkUser = (req, res, next) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ message: "Thiếu thông tin người dùng" });
  }
  next();
}

// tạo user
export const createData = (req, res) => {
  const{name , age} = req.body;
  const newUser = data.find((user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  if (newUser) {
    return res.status(401).json({ message: "Name đã tồn tại " });
  }
  res.status(201).json({  name, age });
}
// cập nhật user
 export const updateData = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
    const user = data.find((user) => user.id === Number(id));
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
   const updatedUser = { ...user, name, age };
   data[data.indexOf(user)] = updatedUser;
   res.status(200).json(updatedUser);
}

// xóa user
export const deleteData = (req, res) => {
  const { id } = req.params;
  const user = data.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  data.splice(data.indexOf(user), 1);
  res.status(204).send();
}
