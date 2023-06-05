import { useAppDispatch, useAppSelector } from '../redux/util';
import { getSelectionMode } from '../redux/modules/world-map/world-map.selector';
import { SelectionMode, worldMapActions } from '../redux/modules/world-map/world-map';
import { klasss } from '../utils/helpers';
import { ReactNode } from 'react';
import { GRID_WRAPPER_ID } from '../hooks/useDrag';

export default function WorldMapWrapper(props: { children: ReactNode }) {
  const { setSelectionMode } = worldMapActions;
  const selectionMode = useAppSelector(getSelectionMode);
  const dispatch = useAppDispatch();

  return (
    <div className="w-screen">
      <div
        id={GRID_WRAPPER_ID}
        className={klasss(
          'w-min mx-auto relative'
          /* , 'border-dashed border-red-600 border-4'*/
        )}
        onMouseDown={(e) => {
          (e.buttons === 1 || e.buttons === 2) &&
            selectionMode === SelectionMode.Idle &&
            dispatch(setSelectionMode(SelectionMode.Active));
        }}
        onMouseUp={(e) => {
          dispatch(setSelectionMode(SelectionMode.Idle));
        }}
        onClick={() => {
          console.log('click');
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
