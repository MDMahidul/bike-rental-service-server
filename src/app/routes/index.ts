import { Router } from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';

const router = Router();

const modeleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
];

modeleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
