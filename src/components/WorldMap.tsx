import { useAppSelector } from "../redux/modules/util";
import { getMapWidth, getMapHeight } from "../redux/modules/world-map.selector";

export default function WorldMap() {
  const width = useAppSelector(getMapWidth);
  const height = useAppSelector(getMapHeight);
  return (
    <div>
      <div>World Map</div>

      {Array(height)
        .fill(0)
        .map((_, i) => (
          <div key={`row-${i}`} className="flex">
            {Array(width)
              .fill(0)
              .map((_, j) => (
                <div
                  key={`col-${j}`}
                  data-testid={`row-${i}-col-${j}`}
                  className={`row-${i} col-${j} w-12 h-12 flex gap-2 justify-center items-center border-solid border text-xs bg-slate-800 hover:bg-slate-600 select-none`}
                  onClick={console.log}
                >
                  {i + 1} {j + 1}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
