import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    const data = {  
        firstname: 'Juan',
        lastname: 'Perez',
        age: 25,
        email: 'juanperez@gmail.com',
        phone: '1234567890'
    }
    res.status(200).render('index', data)
})

export default router;