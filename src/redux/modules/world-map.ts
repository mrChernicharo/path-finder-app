import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorldMapState {
  width: number;
  height: number;
}

const initialState: WorldMapState = {
  width: 10,
  height: 10,
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
export const { reducer: worldMapReducer, name: worldMapName, actions: worldMapActions } =  worldMapSlice;

