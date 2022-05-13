import httpStatus, { OK } from 'http-status';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { PlayerI } from '../../models/player.model';
import databaseOperations from '../../utils/memory-database';
import { SkyfallServer } from '../../index';

const players: PlayerI[] = [
  {
    name: 'hajin', score: 10, win: 2, lose: 1,
  },
  {
    name: 'oscar', score: 200, win: 1, lose: 4,
  },
  {
    name: 'shrey', score: 70, win: 2, lose: 1,
  },
  {
    name: 'josh', score: 400, win: 1, lose: 4,
  },
  {
    name: 'simon', score: 300, win: 2, lose: 1,
  },
];

let skyfallServer: SkyfallServer;
beforeAll(async () => {
  await databaseOperations.connectDatabase();
  skyfallServer = new SkyfallServer();
});
beforeEach(async () => {
  await databaseOperations.clearDatabase();
  const coll = mongoose.connection.db.collection('players');
  await coll.insertMany(players);
});
afterAll(async () => {
  await databaseOperations.closeDatabase();
  if (skyfallServer) {
    await skyfallServer.stop();
  }
});

describe('Player', () => {
  it('GET /player returns OK', async () => {
    const { body: retrieved } = await supertest(skyfallServer.getHttpServer())
      .get('/leaderboard')
      .expect(OK);
    expect(retrieved.length).toBe(players.length);
    expect(retrieved[0].name).not.toBe(players[0].name); // because list should be sorted
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    expect(retrieved[0].name).toBe(sortedPlayers[0].name);
  });
});
