import { Client } from 'boardgame.io/react';
import { game } from './game';
import { ai } from './ai';
import { Board } from './board';

export default Client({
  game,
  board: Board,
  ai,
  // multiplayer: { server: 'localhost:8000' },
  // debug: false,
});
