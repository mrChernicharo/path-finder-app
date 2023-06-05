import { Node } from '../redux/modules/world-map/world-map';
import { getNodes } from '../redux/modules/world-map/world-map.selector';
import { useAppSelector } from '../redux/util';
import { NodeComponent } from './Node';

export default function NodeGrid() {
  const nodesGrid = useAppSelector(getNodes);

  return (
    <>
      {nodesGrid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((node, j) => {
            return <NodeComponent key={`${i}-${j}`} node={node} />;
          })}
        </div>
      ))}
    </>
  );
}
