import React, { createContext, useReducer } from 'react';

export const LayoutContext = createContext();

const initState = {
  theme: 'dark',
  drawerVisible: false,
  scrollTop: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_DRAWER_VISIBLE':
      return { ...state, drawerVisible: action.payload };
    case 'SET_SCROLL_TOP':
      return { ...state, scrollTop: action.payload };
    default:
      throw new Error(`Unknown action type ${action.type}.`);
  }
};

export default function LayoutState({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const setTheme = theme => dispatch({ type: 'SET_THEME', payload: theme });

  const setDrawerVisible = drawerVisible => dispatch({ type: 'SET_DRAWER_VISIBLE', payload: drawerVisible });

  const setScrollTop = scrollTop => dispatch({ type: 'SET_SCROLL_TOP', payload: scrollTop });

  return <LayoutContext.Provider value={{ ...state, setTheme, setDrawerVisible, setScrollTop }}>{children}</LayoutContext.Provider>;
}
