import {User} from "../models/user.js";
import {compareSync} from 'bcrypt';
import {ApiError} from "../errors/ApiError.js";

class AuthService {
    async signUp(userData) {
        let {username, email, password} = userData;
        return User.create({
            username: username,
            email: email,
            password: password
        });
    }

    async signIn(userData) {
        let {email, password} = userData;
        if (!email || !password) throw new ApiError(400, "Email or password is empty");
        const user = await User.findOne({where: {email: userData.email}});
        if (!user) throw new ApiError(404, "User not found");
        this.validatePassword(userData.password, user.password);
        delete user.dataValues.password;
        return user;
    }

    validatePassword(password, validPassword) {
        if (!compareSync(password, validPassword)) {
            throw new ApiError(400, "Wrong password");
        }
    }
}
export default new AuthService()