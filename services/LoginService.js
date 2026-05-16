import LoginRepository from '../repositories/LoginRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'default_secret';
class LoginService {
  async VerifyLogin(email, senha) {
    if (!email || !senha) {
      return {
        sucesso: false,
        erro: 'Email e senha são obrigatórios'
      };
    }

    const response = await LoginRepository.FindByEmail(email);
    if (!response || response.rowCount === 0 || !response.rows || response.rows.length === 0) {
      return {
        sucesso: false,
        erro: 'Usuário não encontrado'
      };
    }

    const user = response.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaCorreta) {
      return {
        sucesso: false,
        erro: 'Senha incorreta'
      };
    }

    const token = jwt.sign({ id: user.id_user }, SECRET, { expiresIn: '1h' });

    return {
      sucesso: true,
      token
    };
  }
}
export default new LoginService();