import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum SelectionMode {
  Idle = "Idle",
  Active = "Active",
  Dragging = "Dragging"
}

export interface Node {
  x: number;
  y: number;
  blocked: boolean;
}

export interface WorldMapState {
  width: number;
  height: number;
  nodeSize: number;
  selectionMode: SelectionMode;
  nodes: Node[][];
}

const initialState: WorldMapState = {
  width: 10,
  height: 10,
  nodeSize: 24,
  selectionMode: SelectionMode.Idle,
  nodes: calculateGrid(40, 20),
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
    setNodeSize: (state, action: PayloadAction<number>) => {
      state.nodeSize = action.payload;
    },
    setSelectionMode: (state, action: PayloadAction<SelectionMode>) => {
      state.selectionMode = action.payload;
    },
    setNodeBlock: (state, action: PayloadAction<Node>) => {
      const { x, y, blocked } = action.payload
      state.nodes[y][x].blocked = blocked;
    }
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
        blocked: false
      };
    }
  }
  return grid;
}
