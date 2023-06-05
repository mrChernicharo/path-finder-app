import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_WIDTH, INITIAL_HEIGHT, INITIAL_NODE_SIZE } from '../../../utils/constants';
import { heuristic } from '../../../utils/a-start';

export enum SelectionMode {
  Idle = 'Idle',
  Active = 'Active',
  Dragging = 'Dragging',
}

export enum PathStatus {
  Idle = 'Idle',
  Active = 'Drawing...',
  Done = 'Done!',
  Fail = 'No Solution!',
}

export interface Pos {
  x: number;
  y: number;
}

export interface AScore {
  f: number; // total cost
  g: number; // cost from start to current point
  h: number; // heuristic -> estimated cost function from current grid point to the goal
}

export interface Node extends Pos, AScore {
  id: string;
  blocked: boolean;
  // neighbors: Node[];
  // parent: Node | undefined;
}

export interface WorldMapState {
  width: number;
  height: number;
  nodeSize: number;
  selectionMode: SelectionMode;
  nodes: Node[][];
  start: Pos;
  end: Pos;
  path: Node[];
  neighbors: Node[];
  pathStatus: PathStatus;
}

const initialState: WorldMapState = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  nodeSize: INITIAL_NODE_SIZE,
  selectionMode: SelectionMode.Idle,
  nodes: createGrid(INITIAL_WIDTH, INITIAL_HEIGHT),
  start: { x: 0, y: 0 },
  end: { x: INITIAL_WIDTH - 1, y: INITIAL_HEIGHT - 1 },
  path: [],
  neighbors: [],
  pathStatus: PathStatus.Idle,
};

export const worldMapSlice = createSlice({
  name: 'worldMap',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      state.nodes = createGrid(state.width, state.height, state.start, state.end);
      state.path = [];
      state.neighbors = [];
      state.pathStatus = PathStatus.Idle;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
      state.nodes = createGrid(state.width, state.height, state.start, state.end);
      state.path = [];
      state.neighbors = [];
      state.pathStatus = PathStatus.Idle;
    },
    setNodeSize: (state, action: PayloadAction<number>) => {
      state.nodeSize = action.payload;
    },
    setSelectionMode: (state, action: PayloadAction<SelectionMode>) => {
      state.selectionMode = action.payload;
    },
    updateNode: (state, action: PayloadAction<Partial<Node> & Pos>) => {
      const { x, y, ...values } = action.payload;
      state.nodes[y][x] = { ...state.nodes[y][x], ...values };
    },
    updateNodes: (state, action: PayloadAction<Array<Partial<Node> & Pos>>) => {
      for (const node of action.payload) {
        const { x, y, ...values } = node;
        state.nodes[y][x] = { ...state.nodes[y][x], ...values };
      }
    },
    setStart: (state, action: PayloadAction<Pos>) => {
      state.start = action.payload;
    },
    setEnd: (state, action: PayloadAction<Pos>) => {
      state.end = action.payload;
    },
    setPath: (state, action: PayloadAction<Node[]>) => {
      state.path = action.payload;
    },
    setNeighbors: (state, action: PayloadAction<Node[]>) => {
      state.neighbors = action.payload;
    },
    setPathStatus: (state, action: PayloadAction<PathStatus>) => {
      state.pathStatus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: worldMapReducer, name: worldMapName, actions: worldMapActions } = worldMapSlice;

function createGrid(
  w: number,
  h: number,
  start = { x: 0, y: 0 },
  end = { x: INITIAL_WIDTH - 1, y: INITIAL_HEIGHT - 1 }
) {
  const grid: Node[][] = [];
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      const pos = { x: j, y: i };
      const g = heuristic(start, pos);
      const h = heuristic(pos, end);
      const f = g + h;

      grid[i][j] = { id: `n-${i}-${j}`, blocked: false, g, h, f, ...pos };
    }
  }
  return grid;
}
