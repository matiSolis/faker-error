import { Router } from "express";

const router = Router();

router.get('/admin', (req, res)=>{
    try{
        res.status(200).render('admin', {user: req.session.user});
    }catch(err){
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

export default router;