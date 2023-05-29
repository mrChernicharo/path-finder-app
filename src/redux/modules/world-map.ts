import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Pos {
  x: number;
  y: number;
}

export interface Node {
  pos: Pos;
  blocked: boolean;
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
  openSet: Node[];
  closedSet: Node[];
}

const initialState: WorldMapState = {
  width: 10,
  height: 10,
  startPos: { x: 0, y: 0 },
  endPos: { x: 9, y: 9 },
  openSet: [],
  closedSet: [],
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
  },
});

// Action creators are generated for each case reducer function
export const {
  reducer: worldMapReducer,
  name: worldMapName,
  actions: worldMapActions,
} = worldMapSlice;
