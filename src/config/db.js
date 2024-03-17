import {Sequelize} from 'sequelize';
import config from 'config';

console.log(config);
const DB_URI = config.get('app.dbUri');

const db = new Sequelize(DB_URI);

export default db