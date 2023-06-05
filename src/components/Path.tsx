import { useState, useEffect, memo } from 'react';
import { Node, Pos } from '../redux/modules/world-map/world-map';
import { getNodes, getStartNode, getEndNode, getNodeSize } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { idMaker } from '../utils/helpers';
import { usePath } from '../hooks/usePath';
import { Tile } from './Tile';

export default function Path(props: { path: Node[] }) {
  return (
    <div>
      {props.path.map(({ x, y, g }) => (
        <Tile key={`tile-${y}-${x}`} x={x} y={y} g={g} />
      ))}
    </div>
  );
}
