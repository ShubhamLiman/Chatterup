import express from 'express';
import { auth } from '../../middlewares/jwtAuth.js';
import { createRoom,joinRoom,getRooms} from './roomController.js';
const roomRoutes = express.Router();

roomRoutes.route('/createroom').post(auth,createRoom);
roomRoutes.route('/joinroom').post(auth,joinRoom);
roomRoutes.route('/getrooms').post(auth,getRooms);
export default roomRoutes;