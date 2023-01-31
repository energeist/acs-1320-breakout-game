/* eslint-disable import/extensions */
import { Game, GameProps } from './Game';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// eslint-disable-next-line no-unused-vars
const game = new Game(canvas, ctx);
