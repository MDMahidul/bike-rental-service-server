import { Router } from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';

const router = Router();

const modeleRoutes = [
    {
        path:'/auth',
        route:AuthRouters,
    }
];

modeleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;