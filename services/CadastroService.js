import CadastroRepository from '../repositories/CadastroRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'default_secret';
class CadastroService {
 async CreateUser(email, senha) {
    if (!email || !senha) {
      return {
        sucesso: false,
        erro: 'Email e senha são obrigatórios'
      };
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const response = await CadastroRepository.CreateUser(email, hashedPassword);

    if (!response || response.rowCount === 0) {
      return {
        sucesso: false,
        erro: 'Erro ao criar usuário'
      };
    }

    const user = response.rows[0];
    const token = jwt.sign({ id: user.id_user }, SECRET, { expiresIn: '1h' });

    return {
      sucesso: true,
      token
    };
  }
}
export default new CadastroService();