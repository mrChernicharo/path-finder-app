import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;
export const getMapWidth = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.width
);
export const getMapHeight = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.height
);
export const getNodeSize = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.nodeSize
);
export const getSelectionMode = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.selectionMode
);
export const getNodes = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.nodes
);
export const getRow = createSelector(
  getNodes,
  (nodes: Node[][], idx: number) => idx,
  (nodes, idx) => nodes[idx]
);
export const getNode = createSelector(
  getNodes,
  (nodes: Node[][], coords: { row: number; col: number }) => coords,
  (nodes, { row, col }) => nodes[row][col]
);

export const getStartPos = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.startPos
);
export const getStartNode = createSelector(selectSelf, ({ worldMap }) => {
  return worldMap.nodes[worldMap.startPos.y][worldMap.startPos.x];
});
export const getEndPos = createSelector(
  selectSelf,
  ({ worldMap }) => worldMap.endPos
);
export const getEndNode = createSelector(selectSelf, ({ worldMap }) => {
  return worldMap.nodes[worldMap.endPos.y][worldMap.endPos.x];
});