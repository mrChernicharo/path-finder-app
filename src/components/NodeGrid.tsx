import { Node } from '../redux/modules/world-map/world-map';
import { idMaker } from '../utils/helpers';
import { NodeComponent } from './Node';

export default function NodeGrid(props: { nodesGrid: Node[][] }) {
  return (
    <div
      className="border-slate-400 border-l-[1px]"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {props.nodesGrid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((node, j) => {
            return <NodeComponent key={`${i}-${j}`} node={node} />;
          })}
        </div>
      ))}
    </div>
  );
}
