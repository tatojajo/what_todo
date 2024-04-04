import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { reducer } from "./reducer";

export const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

type Props = {
  children: ReactNode;
};

const initialState = {
  todos: [],
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const store = {
    ...state,
    dispatch,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
