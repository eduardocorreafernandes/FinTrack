import {pool} from '../database/connection.js'
class CadastroRepository {
  async CreateUser(email, senha_hash) {
    const response = await pool.query('INSERT INTO users (email, hash_senha) VALUES ($1, $2) RETURNING id_user', [email, senha_hash]);
    return response;
  }
}
export default new CadastroRepository();