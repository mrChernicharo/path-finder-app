import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_WIDTH,
  INITIAL_HEIGHT,
  INITIAL_CELL_SIZE,
  START_POS,
  END_POS,
} from "../../util/constants";
import { createGrid, getProcessedNodes } from "../../util/helpers";

export enum SelectionMode {
  Idle = "Idle",
  Active = "Active",
}

export interface Pos {
  x: number;
  y: number;
}

export interface GridNode {
  x: number;
  y: number;
  f: number; // total cost
  h: number; // heuristic -> estimated cost from current point to the goal
  g: number; // cost from start to current point
  blocked: boolean;
  neighbors: GridNode[];
  parent: GridNode | undefined;
}

export interface WorldMapState {
  width: number;
  height: number;
  nodeSize: number;
  selectionMode: SelectionMode;
  nodes: GridNode[][];
  startPos: Pos;
  endPos: Pos;
}

const initialState: WorldMapState = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  nodeSize: INITIAL_CELL_SIZE,
  nodes:  getProcessedNodes(createGrid(INITIAL_WIDTH, INITIAL_HEIGHT),  START_POS, END_POS),
  selectionMode: SelectionMode.Idle,
  startPos: START_POS,
  endPos: END_POS,
};

export const worldMapSlice = createSlice({
  name: "worldMap",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      state.nodes = getProcessedNodes(createGrid(state.width, state.height), state.startPos, state.endPos)
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
      state.nodes = getProcessedNodes(createGrid(state.width, state.height), state.startPos, state.endPos)
    },
    setNodeSize: (state, action: PayloadAction<number>) => {
      state.nodeSize = action.payload;
    },
    setSelectionMode: (state, action: PayloadAction<SelectionMode>) => {
      state.selectionMode = action.payload;
    },
    updateNode: (state, action: PayloadAction<Partial<GridNode> & Pos>) => {
      const { x, y, ...values } = action.payload;
      state.nodes[y][x] = { ...state.nodes[y][x], ...values };
    },
  },
});

export const {
  reducer: worldMapReducer,
  name: worldMapName,
  actions: worldMapActions,
} = worldMapSlice;
