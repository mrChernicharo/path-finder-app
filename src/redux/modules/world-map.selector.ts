import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;
export const getMapWidth = createSelector(selectSelf, ({ worldMap }) => worldMap.width);
export const getMapHeight = createSelector(selectSelf, ({ worldMap }) => worldMap.height);
