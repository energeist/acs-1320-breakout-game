/* eslint-disable import/extensions */
import Game from './Game.js';

console.log('this is main');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// eslint-disable-next-line no-unused-vars
const game = new Game(canvas, ctx);
