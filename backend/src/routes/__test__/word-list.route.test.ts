import httpStatus from 'http-status';
import supertest from 'supertest';
import databaseOperations from '../../utils/memory-database';
import { WordListI } from '../../models/word-list.model';
import { SkyfallServer } from '../../index';

let skyfallServer: SkyfallServer;
beforeAll(async () => {
  await databaseOperations.connectDatabase();
  skyfallServer = new SkyfallServer();
});
beforeEach(async () => {
  await databaseOperations.clearDatabase();
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

const requestMock = async (): Promise<supertest.SuperTest<supertest.Test>> => supertest(skyfallServer.getHttpServer());

describe('WordList', () => {
  it('POST /wordList returns NoContent on valid payload', async () => {
    const request = await requestMock();
    request
      .post('/wordList')
      .send(wordlist1)
      .expect(httpStatus.NO_CONTENT);

    // const result: WordListI = body[0];
  });
  it('GET /wordList correctly returns wordList from database', async () => {
    const request = await requestMock();
    request.get('/wordList')
      .expect(httpStatus.OK);
  });
});
