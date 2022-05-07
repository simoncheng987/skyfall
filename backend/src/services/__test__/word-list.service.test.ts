import mongoose from 'mongoose';
import { getWordList, checkWordListExists } from '../word-list.service';
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
  const coll = mongoose.connection.db.collection('wordlists');
  await coll.insertMany(wordLists);
});
afterAll(async () => {
  await databaseOperations.closeDatabase();
  if (skyfallServer) {
    await skyfallServer.stop();
  }
});

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

describe('WordList', () => {
  it('List name list2 should not exist', async () => {
    const exists = await checkWordListExists('list2');
    if (exists) {
      fail();
    }
  });
  it('List with name "default" should exist', async () => {
    const list = await getWordList('default');
    expect(list[0]).toBe('hello');
    expect(list[1]).toBe('dello');
    expect(list[2]).toBe('mello');
  });
});
