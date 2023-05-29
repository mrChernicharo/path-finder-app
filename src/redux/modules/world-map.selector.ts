import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;
export const getMapWidth = createSelector(selectSelf, ({ worldMap }) => worldMap.width);
export const getMapHeight = createSelector(selectSelf, ({ worldMap }) => worldMap.height);
export const getStartPos = createSelector(selectSelf, ({ worldMap }) => worldMap.startPos);
export const getEndPos = createSelector(selectSelf, ({ worldMap }) => worldMap.endPos);
export const getGrid = createSelector(selectSelf, ({ worldMap }) => worldMap.grid);
