import UserService from '../services/UserService.js';
class UserController {
     async searchUserByiD(req,res){
        try{
const id=req.params.id;
        const searchedUser=await UserService.GetUser(id);
        res.status(201).json(searchedUser);
}     catch(err){
res.status(400).json({ err: err.message })
}
}   
    } 
    export default new UserController();