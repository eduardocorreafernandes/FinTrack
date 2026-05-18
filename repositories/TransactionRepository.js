import { pool } from '../database/connection.js'

class TransactionRepository {
  async create(transaction) {
    const {
      valor,
      descricao,
      data_realizacao,
      categoria,
      conta,
      usuario,
      eh_recorrente,
      eh_parcelada,
      num_parcela,
      total_parcelas,
      id_grupo_parcela
    } = transaction;

    const query = `INSERT INTO transacao (valor, descricao, data_realizacao, categoria, conta, usuario, eh_recorrente, eh_parcelada, num_parcela, total_parcelas, id_grupo_parcela)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;

    const values = [valor, descricao, data_realizacao || new Date(), categoria, conta, usuario, eh_recorrente || false, eh_parcelada || false, num_parcela || null, total_parcelas || null, id_grupo_parcela || null];

    const res = await pool.query(query, values);
    return res;
  }

  async findAll() {
    const res = await pool.query('SELECT * FROM transacao ORDER BY data_realizacao DESC');
    return res;
  }

  async findById(id) {
    const res = await pool.query('SELECT * FROM transacao WHERE id_transacao = $1', [id]);
    return res;
  }

  async update(id, transaction) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(transaction)) {
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    const query = `UPDATE transacao SET ${fields.join(', ')} WHERE id_transacao = $${idx} RETURNING *`;
    values.push(id);
    const res = await pool.query(query, values);
    return res;
  }

  async delete(id) {
    const res = await pool.query('DELETE FROM transacao WHERE id_transacao = $1', [id]);
    return res;
  }
}

export default new TransactionRepository();
