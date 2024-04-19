import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

// cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Pixel cart server is running');
});

// global error handler
app.use(globalErrorHandler);

// Not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
