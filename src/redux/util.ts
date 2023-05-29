import {
  TypedUseSelectorHook,
  shallowEqual,
  useDispatch,
  useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);

/**
 * @example
 * const value = useAppSelectorArgs(selector, compareValue);
 * const value = useAppSelectorArgs(selector, valueOne, valueTwo);
 */
export const useAppSelectorArgs = <R>(
  selector: Function,
  ...args: unknown[]
): R => useSelector((state) => selector(state, ...args));

export type UseAppDispatchType = ReturnType<typeof useAppDispatch>;
