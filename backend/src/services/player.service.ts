import Player, { PlayerI } from '../models/player.model';

export const getTopNPlayersByScore = async (n: number) => {
  const players = await Player.find().sort({ score: 'desc' }).limit(10);
  return players;
};

export const getPlayerAndCreateIfNotPresent = async (name: string) => {
  let player = await Player.findOne({ name });
  if (!player) {
    player = await new Player({
      name, score: 0, win: 0, lose: 0,
    }).save();
  }

  return player;
};

export const editPlayer = async (name: string, score: number, win: number, lose: number) => {
  const player = await Player.findOneAndUpdate({ name }, { score, win, lose });
  return !!player;
};
