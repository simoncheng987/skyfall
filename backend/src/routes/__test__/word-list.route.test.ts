import httpStatus, { NO_CONTENT, OK } from 'http-status';
import supertest from 'supertest';
import mongoose from 'mongoose';
import databaseOperations from '../../utils/memory-database';
import { WordListI } from '../../models/word-list.model';
import { SkyfallServer } from '../../index';

const wordLists: WordListI[] = [
  {
    listName: 'default',
    wordList: ['hello', 'dello', 'mello'],
  },
  {
    listName: 'list1',
    wordList: ['apple', 'banana', 'orange'],
  },
];

let skyfallServer: SkyfallServer;

beforeAll(async () => {
  await databaseOperations.connectDatabase();
  skyfallServer = new SkyfallServer();
});
beforeEach(async () => {
  await databaseOperations.clearDatabase();
  const coll = mongoose.connection.db.collection('wordlists');
  await coll.insertMany(wordLists);
});
afterAll(async () => {
  await databaseOperations.closeDatabase();
  if (skyfallServer) {
    await skyfallServer.stop();
  }
});

const wordlist1: WordListI = {
  listName: 'Word list 1',
  wordList: ['apple', 'banana', 'citrus'],
};

describe('WordList', () => {
  it('POST /wordList returns NoContent on valid payload', async () => {
    await supertest(skyfallServer.getHttpServer())
      .post('/wordList')
      .send(wordlist1)
      .expect(NO_CONTENT);
  });
  it('GET /wordList correctly returns wordList from database', async () => {
    const { body: retrieved } = await supertest(skyfallServer.getHttpServer())
      .get('/wordList')
      .expect(OK);
    expect(retrieved.length).toBe(wordLists.length);
    expect(retrieved[0].listName).toBe(wordLists[0].listName);
  });
});
