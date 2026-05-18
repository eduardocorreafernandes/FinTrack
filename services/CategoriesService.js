import CategoriesRepository from '../repositories/CategoriesRepository.js';
class CategoriesService {
 async CreateCategory(nome, tipo) {
    if (!nome) {
      return {
        sucesso: false,
        erro: 'Nome é obrigatório'
      };
    }
    const categoriaTipo = tipo || 'gasto';
    const response = await CategoriesRepository.CreateCategory(nome, categoriaTipo);
    if (!response || response.rowCount === 0) {
      return {
        sucesso: false,
        erro: 'Erro ao criar categoria'
      };
    }

    const category = response.rows[0];
    return {
      sucesso: true,
      category
    };
  }
  async ListCategories() {
    try {
      const response = await CategoriesRepository.ListCategories();
      if (!response || !response.rows) {
        return [];
      }
      return response.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
export default new CategoriesService();