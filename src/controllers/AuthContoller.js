import AuthService from "../services/AuthService.js";
import {ValidationError} from "sequelize";

export class AuthController {
    async signUp(req, res, next) {
        try {
            const createdUser = await AuthService.signUp(req.body);
            return res.status(400).json({id: createdUser.id});
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const user = await AuthService.signIn(req.body);
            return res.status(200).json({user});
        } catch (error) {
            next(error)
        }
    }
}