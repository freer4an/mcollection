import {ApiError} from "../errors/ApiError.js";
import {Sequelize} from "sequelize";

function handleError(err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) return res.status(err.code).json({error: err.message});
    if (err instanceof Sequelize.ValidationError) {
        const parsedSequelizeErrors = err.errors.map(err => ({
            field: err.path,
            message: err.message,
        }));
        return res.status(400).json({error: parsedSequelizeErrors});
    }
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
}

export default handleError