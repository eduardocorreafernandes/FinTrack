import express from 'express';
import CategoriesController from '../controllers/CategoriesController.js';
const router = express.Router();
router.post('/', CategoriesController.CreateCategory);
router.get('/', CategoriesController.ListCategories);
export default router;