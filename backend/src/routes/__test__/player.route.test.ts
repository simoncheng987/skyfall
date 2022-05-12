import httpStatus, { OK } from 'http-status';
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

const requestMock = async (): Promise<supertest.SuperTest<supertest.Test>> => supertest(skyfallServer.getHttpServer());

describe('Player', () => {
  it('GET /player returns OK', async () => {
    const request = await requestMock();
    request
      .get('/player')
      .expect(OK);
  });
});
