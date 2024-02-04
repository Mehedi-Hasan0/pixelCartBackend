import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is working for pixel perfect');
});

export default app;
