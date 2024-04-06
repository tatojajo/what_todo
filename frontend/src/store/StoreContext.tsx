import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { reducer } from "./reducer";

export const StoreContext = createContext<Store | null>(null);

export const useStore = () => useContext(StoreContext);

type Props = {
  children: ReactNode;
};

const initialState = {
  todos: [],
};

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type Store = {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const store: Store = {
    ...state,
    dispatch,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
