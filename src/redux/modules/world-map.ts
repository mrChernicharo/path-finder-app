import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { END_POS, INITIAL_HEIGHT, INITIAL_WIDTH, START_POS } from "../../utils/constants";

export interface Pos {
  x: number;
  y: number;
}

export interface Node {
  pos: Pos;
  blocked: boolean;
  f: number;
  g: number;
  h: number;
  neighbors: Node[];
  parent?: Node;
  isStart?: boolean;
  isEnd?: boolean;
  visited?: boolean;
  isPath?: boolean;
}

export interface WorldMapState {
  width: number;
  height: number;
  startPos: Pos;
  endPos: Pos;
  currentNode: Node | undefined;
  openSet: Node[];
  closedSet: Node[];
  grid: Node[][];
}

const initialState: WorldMapState = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  startPos: START_POS,
  endPos: END_POS,
  currentNode: undefined,
  openSet: [],
  closedSet: [],
  grid: createGrid(INITIAL_WIDTH, INITIAL_HEIGHT, START_POS, END_POS),
};

export const worldMapSlice = createSlice({
  name: "worldMap",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setOpenSet: (state, action: PayloadAction<Node[]>) => {
      state.openSet = action.payload;
    },
    setClosedSet: (state, action: PayloadAction<Node[]>) => {
      state.closedSet = action.payload;
    },
    setCurrentNode: (state, action: PayloadAction<Node>) => {
      state.currentNode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: worldMapReducer, name: worldMapName, actions: worldMapActions } = worldMapSlice;

//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
export function heuristic(pos0: Pos, pos1: Pos) {
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);

  return d1 + d2;
}

export function createGrid(w: number, h: number, startPos: Pos, endPos: Pos) {
  const grid: Node[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      const pos = { x: j, y: i };
      const h = heuristic(pos, endPos);
      const g = heuristic(startPos, pos);
      const f = h + g;

      grid[i][j] = {
        pos,
        f,
        g,
        h,
        blocked: false,
        neighbors: [],
        parent: undefined,
        isStart: pos.x === startPos.x && pos.y === startPos.y,
        isEnd: pos.x === endPos.x && pos.y === endPos.y,
      };
    }
  }
  console.log(grid);
  return grid;
}
