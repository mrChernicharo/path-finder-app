import { Node } from '../redux/modules/world-map/world-map';
import { getNodes } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { AppNode } from './AppNode';

export default function NodeGrid() {
  const nodesGrid = useAppSelector(getNodes);

  return (
    <>
      {nodesGrid.map((row, i) => (
        <div key={i} className="flex touch-none">
          {row.map((node, j) => {
            return <AppNode key={`${i}-${j}`} node={node} />;
          })}
        </div>
      ))}
    </>
  );
}
