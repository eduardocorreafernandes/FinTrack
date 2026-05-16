import LoginService from '../services/LoginService.js';
class LoginController {
  async ReceiveLogin(req, res) {
    try {
      const email = req.body.email;
      const senha = req.body.senha || req.body.password;
      const result = await LoginService.VerifyLogin(email, senha);
      return res.status(result.sucesso ? 200 : 401).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao processar login' });
    }
  }
}
export default new LoginController();