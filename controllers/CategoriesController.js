import CategoriesService from '../services/CategoriesService.js';
class CategoriesController {
  async CreateCategory(req, res) {
    try {
      const { nome, tipo } = req.body;
      const category = await CategoriesService.CreateCategory(nome, tipo);
      return res.status(201).json(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno ao criar categoria' });
    }
  }
  async ListCategories(req, res) {
    try{
      const categories = await CategoriesService.ListCategories();
      return res.status(200).json({ sucesso: true, categories: categories || [] });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ sucesso: false, erro: 'Erro interno ao listar categorias' });
    }
  }
}
export default new CategoriesController();