import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export const INITIAL_WIDTH = 15;
export const MAX_WIDTH = 40;
export const MIN_WIDTH = 5;

export const INITIAL_HEIGHT = 10;
export const MAX_HEIGHT = 40;
export const MIN_HEIGHT = 5;

export const INITIAL_CELL_SIZE = 30;
export const MAX_CELL_SIZE = 60;
export const MIN_CELL_SIZE = 20;

export enum SelectionMode {
  Idle = "Idle",
  Active = "Active",
}

export interface Pos {
  x: number;
  y: number;
}

export interface Node {
  x: number;
  y: number;
  f: number;
  h: number;
  g: number;
  blocked: boolean;
  neighbors: Node[];
}


export interface WorldMapState {
  width: number;
  height: number;
  nodeSize: number;
  selectionMode: SelectionMode;
  nodes: Node[][];
}

const initialState: WorldMapState = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  nodeSize: INITIAL_CELL_SIZE,
  nodes: createGrid(INITIAL_WIDTH, INITIAL_HEIGHT),
  selectionMode: SelectionMode.Idle,
};

export const worldMapSlice = createSlice({
  name: "worldMap",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      state.nodes = createGrid(state.width, state.height)
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
      state.nodes = createGrid(state.width, state.height)
    },
    setNodeSize: (state, action: PayloadAction<number>) => {
      state.nodeSize = action.payload;
    },
    setSelectionMode: (state, action: PayloadAction<SelectionMode>) => {
      state.selectionMode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  reducer: worldMapReducer,
  name: worldMapName,
  actions: worldMapActions,
} = worldMapSlice;

function createGrid(w: number, h: number) {
  const grid: Node[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      grid[i][j] = {
        x: j,
        y: i,
        f: 0,
        g: 0,
        h: 0,
        blocked: false,
        neighbors: []
      };
    }
  }
  return grid;
}
