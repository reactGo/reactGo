import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { db } from './constants';

export default () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.connect(db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  // Register schema as mongoose model
  const modelPath = path.join(__dirname, 'models');
  fs.readdirSync(modelPath).forEach((file) => {
    if (~file.indexOf('.js')) require(`${modelPath}/${file}`);
  });
};
