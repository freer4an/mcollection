import config from 'config';
import express from 'express';
import db from "./config/db.js";
import authRoutes from './routes/AuthRoutes.js';
import errorHandler from "./middlewares/errorHandler.js";

const appConfig = config.get('app');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use(errorHandler);

async function start() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(PORT, appConfig.host, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start()
    .then(console.log)
    .catch(console.error)