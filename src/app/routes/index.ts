import { Router } from 'express';

const router = Router();

const modeleRoutes = [
    {
        path:'',
        route:'',
    }
];

modeleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;