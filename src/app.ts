import 'reflect-metadata';
import express, {NextFunction} from 'express';
import createConnection from './database';
import { router } from './routes';
import { AppErros } from './errors/AppErros';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppErros) {
        return response.status(err.statusCode).jsson({
           message: err.message,
        });
    }

    return response.status(500).jsson({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
});

export { app };
