import CadastroService from '../services/CadastroService.js';
class CadastroController {
  async ReceiveCadastro(req, res) {
    try {
      const { email, senha } = req.body;
      const result = await CadastroService.CreateUser(email, senha);
      return res.status(result.sucesso ? 201 : 400).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao processar cadastro' });
    }
  }
}
export default new CadastroController();