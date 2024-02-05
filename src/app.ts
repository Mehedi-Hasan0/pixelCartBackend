import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/users', UserRoutes);

// global error handler
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is working for pixel perfect');
});

export default app;
