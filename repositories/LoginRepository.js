import {pool} from '../database/connection.js'

class LoginRepository {
  async FindByEmail(email) {
    const response = await pool.query('SELECT email,senha_hash,id_user FROM usuarios WHERE email=$1', [email]);
    return response;
  }
}
export default new LoginRepository();