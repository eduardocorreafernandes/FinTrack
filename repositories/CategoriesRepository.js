import {pool} from '../database/connection.js'
class CategoriesRepository {
  async CreateCategory(nome, tipo) {
    const response = await pool.query('INSERT INTO categoria_gasto(nome, tipo) VALUES ($1, $2) RETURNING id_categoria', [nome, tipo]);
    return response;
  }
  async ListCategories() {
    const response = await pool.query('SELECT * FROM categoria_gasto');
    return response;
  }
}
export default new CategoriesRepository();