import { model, Schema } from 'mongoose';

export interface PlayerI {
  name: string;
  score: number;
  win: number;
  lose: number;
}

const Player = model<PlayerI>('Player', new Schema<PlayerI>({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  win: { type: Number, default: 0 },
  lose: { type: Number, default: 0 },
}));

export default Player;
