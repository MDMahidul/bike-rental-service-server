"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)('admin', 'user'), user_controller_1.UserControllers.getUserProfile);
router.put('/me', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(user_validation_1.userValidations.updateUserValidationSchema), user_controller_1.UserControllers.updateUserProfile);
exports.UserRouters = router;
