import Mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger';

/**
 * This is responsible for setting up an in-memory database that can be used for testing sandbox.
 * The in-memory database can be started, closed, and cleared, and does not affect the actual production database,
 * making it ideal for testing purpose
 */

let mongoMock;
const connectDatabase = async () => {
  mongoMock = await MongoMemoryServer.create();
  const uri = mongoMock.getUri();
  await Mongoose.connect(uri);
};

const closeDatabase = async () => {
  if (mongoMock) {
    await Mongoose.connection.close();
    await mongoMock.stop();
  }
};

const clearDatabase = async () => {
  const { collections } = Mongoose.connection;
  const toDelete: Promise<any>[] = [];
  Object.keys(collections)
    .forEach((key) => toDelete.push(collections[key].deleteMany(() => true)));

  return Promise.all(toDelete);
};

const databaseOperations = {
  connectDatabase,
  closeDatabase,
  clearDatabase,
};

export default databaseOperations;
