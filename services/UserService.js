import UserRepository from '../repositories/UserRepository.js';
class UserService{
    async createUser(userData) {
     const userExists = await UserRepository.UserExists(userData.email);
     if(userExists){
throw new error('usuário já existe');
     }
     const hash_senha=await hash(userData.senha,8);
return await UserRepository.save(userData);
    }
async GetUser(id){
const searchUser=await UserRepository.FindByEmail(id);
}
}
export default new UserService();