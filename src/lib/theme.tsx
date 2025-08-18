// lib/theme.tsx
'use client'; // Add this at the top

import React, { createContext, useContext, useReducer, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
};

type ThemeAction = {
  type: 'TOGGLE_THEME';
};

const initialState: ThemeState = {
  theme: 'dark', // Default to dark mode
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
}

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    document.documentElement.className = state.theme;
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}