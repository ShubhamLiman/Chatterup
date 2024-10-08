import express from 'express';
import { registerUser,login,userLogout,userLoggedin} from './userController.js';
const userRoutes = express.Router();

userRoutes.route('/register').post(registerUser);
userRoutes.route('/login').post(login);
userRoutes.route('/logout').get(userLogout);
userRoutes.route('/checlogin').get(userLoggedin);
export default userRoutes;