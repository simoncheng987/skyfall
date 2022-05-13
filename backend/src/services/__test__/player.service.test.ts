import mongoose from 'mongoose';
import Player, { PlayerI } from '../../models/player.model';
import databaseOperations from '../../utils/memory-database';
import { SkyfallServer } from '../../index';
import { editPlayer, getPlayerAndCreateIfNotPresent, getTopNPlayersByScore } from '../player.service';

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

const sevenPlayers: PlayerI[] = [
  {
    name: 'nijah', score: 130, win: 2, lose: 1,
  },
  {
    name: 'racso', score: 1000, win: 1, lose: 4,
  },
  {
    name: 'yerhs', score: 382, win: 2, lose: 1,
  },
  {
    name: 'hsoj', score: 100, win: 1, lose: 4,
  },
  {
    name: 'monis', score: 70, win: 2, lose: 1,
  },
  {
    name: 'lolz', score: 200, win: 2, lose: 1,
  },
  {
    name: 'zlol', score: 700, win: 1, lose: 4,
  },
  {
    name: 'andrew', score: 800, win: 2, lose: 1,
  },
];

describe('Player', () => {
  describe('Top 10 players', () => {
    it('Top 10 players when there are 5 players', async () => {
      const fetchedPlayers = await getTopNPlayersByScore(10);
      expect(fetchedPlayers.length).toBe(5);
      const expectedPlayersScore = players.map((e) => e.score).sort((a, b) => b - a);
      const fetchedPlayersScore = fetchedPlayers.map((e) => e.score);
      for (let i = 0; i < fetchedPlayers.length; i++) {
        expect(fetchedPlayersScore[i]).toBe(expectedPlayersScore[i]);
      }
    });
    it('Top 10 players when there 13 players', async () => {
      const coll = mongoose.connection.db.collection('players');
      await coll.insertMany(sevenPlayers);

      const fetchedPlayers = await getTopNPlayersByScore(10);
      expect(fetchedPlayers.length).toBe(10);
      const expectedPlayersScore = [...players, ...sevenPlayers].map((e) => e.score).sort((a, b) => b - a);
      const fetchedPlayersScore = fetchedPlayers.map((e) => e.score);
      for (let i = 0; i < fetchedPlayers.length; i++) {
        expect(fetchedPlayersScore[i]).toBe(expectedPlayersScore[i]);
      }
    });
  });
  describe('getPlayerAndCreateIfNotPresent', () => {
    it('Return a new player when not present', async () => {
      const player: PlayerI = await getPlayerAndCreateIfNotPresent('DOESNOTEXIST');
      expect(player.name).toBe('DOESNOTEXIST');
      expect(player.lose).toBe(0);
      expect(player.win).toBe(0);
      expect(player.score).toBe(0);
    });
    it('Get Player when present', async () => {
      const player: PlayerI = await getPlayerAndCreateIfNotPresent('hajin');
      expect(player.name).toBe('hajin');
      expect(player.score).toBe(10);
      expect(player.win).toBe(2);
      expect(player.lose).toBe(1);
    });
  });
  describe('editPlayer', () => {
    it('Return false if user not present', async () => {
      const hasBeenEdited = await editPlayer('DOESNOTEXIST', 1, 2, 3);
      expect(hasBeenEdited).toBe(false);
    });
    it('Return true if user present, and have the user updated', async () => {
      const hasBeenEdited = await editPlayer('hajin', 20, 30, 40);
      expect(hasBeenEdited).toBe(true);
      const player: PlayerI | null = await Player.findOne({ name: 'hajin' });
      expect(player).not.toBeNull();
      if (player) {
        expect(player.score).toBe(20);
        expect(player.win).toBe(30);
        expect(player.lose).toBe(40);
      }
    });
  });
});
