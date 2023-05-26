import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum SelectionMode {
  Idle = "Idle",
  Active = "Active",
}

export interface Node {
  x: number;
  y: number;
}

export interface WorldMapState {
  width: number;
  height: number;
  selectionMode: SelectionMode;
  nodes: Node[][];
}

const initialState: WorldMapState = {
  width: 10,
  height: 10,
  selectionMode: SelectionMode.Idle,
  nodes: calculateGrid(10, 10),
};

export const worldMapSlice = createSlice({
  name: "worldMap",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      state.nodes = calculateGrid(state.width, state.height)
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
      state.nodes = calculateGrid(state.width, state.height)
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

function calculateGrid(w: number, h: number) {
  const grid: Node[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      grid[i][j] = {
        x: j,
        y: i,
      };
    }
  }
  return grid;
}
