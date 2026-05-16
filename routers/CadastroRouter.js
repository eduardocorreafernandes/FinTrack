import express from 'express';
import CadastroController from '../controllers/CadastroController.js';
const router = express.Router();
router.post('/', CadastroController.ReceiveCadastro);
export default router;