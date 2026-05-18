import {pool} from '../database/connection.js'

class LoginRepository {
  async FindByEmail(email) {
    const response = await pool.query('SELECT email,hash_senha,id_user FROM users WHERE email=$1', [email]);
    return response;
  }
}
export default new LoginRepository();