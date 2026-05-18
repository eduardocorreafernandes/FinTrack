import {pool} from '../database/connection.js'
class UserRepository{
    async UserExists(email) {
const [rows]=await pool.query('SELECT email FROM users WHERE email=$1',[email]);
if(rows.length>0){
return true;
} else {
return false;
}
}
async FindByEmail(email,res) {
 const response=await pool.query('SELECT email FROM users WHERE email=$1',[email]);
 res.status(200).json({client:response});

}
     async save(userData) {
    const { name, email, password } = userData;
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
    const values = [name, email, password];

    const { rows } = await pool.query(query, values);
    return rows[0]; // Retorna o usuário recém-criado com o ID gerado pelo banco
  }
}
export default new UserRepository();