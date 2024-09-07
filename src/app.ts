import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// app main route
app.use('/api',router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello bike rental!');
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
