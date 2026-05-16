import TransactionRepository from '../repositories/TransactionRepository.js';

class TransactionServices {
  async CreateTransaction(data) {
    // basic validation
    if (!data || data.valor == null || data.categoria == null || data.conta == null || data.usuario == null) {
      return { sucesso: false, erro: 'Campos obrigatórios ausentes' };
    }

    const res = await TransactionRepository.create(data);
    return { sucesso: true, transaction: res.rows[0] };
  }

  async GetTransactions() {
    const res = await TransactionRepository.findAll();
    return { sucesso: true, transactions: res.rows };
  }

  async UpdateTransaction(id, data) {
    const existing = await TransactionRepository.findById(id);
    if (!existing || existing.rowCount === 0) {
      return { sucesso: false, erro: 'Transação não encontrada' };
    }

    const res = await TransactionRepository.update(id, data);
    return { sucesso: true, transaction: res.rows[0] };
  }

  async DeleteTransaction(id) {
    const existing = await TransactionRepository.findById(id);
    if (!existing || existing.rowCount === 0) {
      return { sucesso: false, erro: 'Transação não encontrada' };
    }

    await TransactionRepository.delete(id);
    return { sucesso: true };
  }
}

export default new TransactionServices();
