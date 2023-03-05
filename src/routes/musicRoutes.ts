import { Router } from 'express';
import { allMusics, addMusic, detailMusic,updateMusic,deleteMusic,allMusic } from '../controllers/musicController';


const router: Router = Router();

router.get('/music', allMusics);

router.get('/music/all', allMusic);

router.post('/music/add', addMusic)

router.get('/music/:id', detailMusic);

router.put('/music/:id/update', updateMusic)

router.delete('/music/:id/delete', deleteMusic);

export default router;