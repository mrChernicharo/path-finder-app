import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum SelectionMode {
  Idle = 'Idle',
  Active = 'Active',
  Dragging = 'Dragging',
}

export interface Pos {
  x: number;
  y: number;
}

export interface Node {
  x: number;
  y: number;
  blocked: boolean;
  // f: number; // total cost
  // g: number; // cost from start to current point
  // h: number; // heuristic -> estimated cost function from current grid point to the goal
  // neighbors: Node[];
  // parent: Node | undefined;
}

export const INITIAL_WIDTH = 20;
export const INITIAL_HEIGHT = 20;

export interface WorldMapState {
  width: number;
  height: number;
  nodeSize: number;
  selectionMode: SelectionMode;
  nodes: Node[][];
  start: Pos;
  end: Pos;
}

const initialState: WorldMapState = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  nodeSize: 24,
  selectionMode: SelectionMode.Idle,
  nodes: createGrid(INITIAL_WIDTH, INITIAL_HEIGHT),
  start: { x: 3, y: 2 },
  end: { x: 16, y: 16 },
};

export const worldMapSlice = createSlice({
  name: 'worldMap',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      state.nodes = createGrid(state.width, state.height);
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
      state.nodes = createGrid(state.width, state.height);
    },
    setNodeSize: (state, action: PayloadAction<number>) => {
      state.nodeSize = action.payload;
    },
    setSelectionMode: (state, action: PayloadAction<SelectionMode>) => {
      state.selectionMode = action.payload;
    },
    // setNodeBlock: (state, action: PayloadAction<{ x: number, y:number, blocked: boolean }>) => {
    setNodeBlock: (state, action: PayloadAction<Node>) => {
      const { x, y, blocked } = action.payload;
      state.nodes[y][x] = { ...state.nodes[y][x], blocked };
    },
    setStart: (state, action: PayloadAction<Pos>) => {
      state.start = action.payload;
    },
    setEnd: (state, action: PayloadAction<Pos>) => {
      state.end = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { reducer: worldMapReducer, name: worldMapName, actions: worldMapActions } = worldMapSlice;

function createGrid(w: number, h: number) {
  const grid: Node[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      grid[i][j] = {
        x: j,
        y: i,
        blocked: false,
      };
    }
  }
  return grid;
}
