import React from "react";
import { createContext, useReducer, ReactNode, useContext } from "react";
import Reducer from "./Reducer";
import { defaultUnit } from "../app.config";
import { LocationType } from "../model/Location";

export type State = {
  unit: string;
  location?: LocationType;
};

const initialState = {
  unit: defaultUnit,
};

export type Action = { type: string; payload: any };
type Dispatch = (action: Action) => void;

type Props = {
  children: ReactNode;
};
const StoreContext = createContext<State>(initialState);
const DispatchContext = createContext<Dispatch | null>(null);

const Store = ({ children }: Props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
export const useDispatch = () => useContext(DispatchContext);
export default Store;
