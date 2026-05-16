import {pool} from '../database/connection.js'
class CadastroRepository {
  async CreateUser(email, senha_hash) {
    const response = await pool.query('INSERT INTO usuarios (email, senha_hash) VALUES ($1, $2) RETURNING id_user', [email, senha_hash]);
    return response;
  }
}
export default new CadastroRepository();