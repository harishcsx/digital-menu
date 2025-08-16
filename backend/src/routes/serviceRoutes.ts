import  {Router} from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { insertStore, retriveStore, publicStore } from '../controllers/serviceController';


const serviceRouter = Router();

serviceRouter.post('/create/store', authenticate, insertStore);
serviceRouter.get('/show/store', authenticate, retriveStore);
serviceRouter.get('/store/:storeId', publicStore);

export default serviceRouter;
