import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, normalLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    normalLogger.info('Database is connected successfully');

    server = app.listen(config.port, () => {
      normalLogger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing our server');

    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// process.on('SIGTERM', () => {
//   normalLogger.info('SIGTERM is recieved!');

//   if (server) {
//     server.close();
//   }
// });
