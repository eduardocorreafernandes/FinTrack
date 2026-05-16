import TransactionServices from '../services/TransactionServices.js';

class TransactionsController {
  async CreateTransaction(req, res) {
    try {
      const data = req.body;
      const result = await TransactionServices.CreateTransaction(data);
      return res.status(result.sucesso ? 201 : 400).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao criar transação' });
    }
  }

  async GetTransactions(req, res) {
    try {
      const result = await TransactionServices.GetTransactions();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao buscar transações' });
    }
  }

  async UpdateTransaction(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await TransactionServices.UpdateTransaction(id, data);
      return res.status(result.sucesso ? 200 : 404).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao atualizar transação' });
    }
  }

  async DeleteTransaction(req, res) {
    try {
      const { id } = req.params;
      const result = await TransactionServices.DeleteTransaction(id);
      return res.status(result.sucesso ? 200 : 404).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao deletar transação' });
    }
  }
}

export default new TransactionsController();
