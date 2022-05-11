import 'dotenv/config';

export const port = process.env.PORT || '...You have not supplied PORT number!';
export const mongodbUri = process.env.MONGODB || '...You have not supplied MONGODB url!';
export const MAX_PLAYERS = 2;
