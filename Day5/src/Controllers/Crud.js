import express from 'express';
import Todo from '../models/Crud.js';
import { Op } from "sequelize";


// lấy user
export const getData = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
}


// tạo user
export const createData = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Vui lòng nhập tiêu đề công việc" });
    }
    const existingTodo = await Todo.findOne({
      where: { title: { [Op.iLike]: title.trim() } }, 
    });

    if (existingTodo) {
      return res.status(400).json({ message: "Công việc này đã tồn tại!" });
    }
    const newTodo = await Todo.create({
      title: title.trim(),
      completed: completed || false,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Công việc này đã tồn tại trong cơ sở dữ liệu!" });
    }
    res.status(500).json({ message: "Lỗi server" });
  }
};

// cập nhật user
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Không tìm thấy todo" });
    }
    const updatedTodo = await todo.update({ title, completed });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
}

// xóa user
export const deleteData = async (req, res) => {
 try {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return res.status(404).json({ message: "Không tìm thấy todo" });
  }
  await todo.destroy();
  res.status(204).send();
 } catch (error) {
  res.status(500).json({ message: "Lỗi server" });
 }
}
