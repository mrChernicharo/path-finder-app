export const INITIAL_NODE_SIZE = 30;

const maxX =  Math.floor(window.innerWidth / INITIAL_NODE_SIZE);

export const INITIAL_WIDTH = maxX < 30 ? maxX : 30;
export const INITIAL_HEIGHT = 10;


export const MAX_WIDTH = 100;
export const MIN_WIDTH = 5;

export const MAX_HEIGHT = 50;
export const MIN_HEIGHT = 5;

export const MIN_NODE_SIZE = 15;
export const MAX_NODE_SIZE = 50;

export const INITIAL_START_POS = { x: 0, y: 0 };
export const INITIAL_END_POS = { x: INITIAL_WIDTH - 1, y: INITIAL_HEIGHT - 1 };
