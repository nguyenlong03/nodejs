import express from 'express';
import { getData , createData,updateData,deleteData } from '../Controllers/Crud.js';



const router = express.Router();

// crud Router
router.get('/', getData);
router.post('/user', createData);
router.put('/user/:id', updateData);
router.delete('/:id', deleteData);

export default router;