import {User} from "../models/user";
export class UserController {
    async getUser(req, res) {
        try {
            const {id} = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({error: 'User not found'});
            res.json(user);
        } catch (e) {
            res.status(500).json({error: 'Something went wrong'});
            console.error(e);
        }
    }
}