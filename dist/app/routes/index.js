"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const router = (0, express_1.Router)();
const modeleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRouters,
    },
    {
        path: '/user',
        route: user_routes_1.UserRouters,
    },
    {
        path: '/bikes',
        route: bike_routes_1.BikeRouters,
    },
    {
        path: '/rentals',
        route: booking_routes_1.BookingRouters,
    },
];
modeleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
