// lib/theme.tsx
'use client'; // Add this at the top

import React, { createContext, useContext, useReducer, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
};

type ThemeAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme };

const initialState: ThemeState = {
  theme: 'dark', // Default to dark mode
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_THEME':
      return {
        theme: action.payload,
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
    // On first mount, initialize theme from localStorage or system preference
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ?? (prefersDark ? 'dark' : 'light');

    // Apply initial theme without flicker
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initial);
    if (state.theme !== initial) {
      dispatch({ type: 'SET_THEME', payload: initial });
    }

    // Listen to system changes to keep in sync if user hasn't explicitly chosen
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMedia = (e: MediaQueryListEvent) => {
      const systemTheme: Theme = e.matches ? 'dark' : 'light';
      const manual = localStorage.getItem('theme');
      if (!manual) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
        dispatch({ type: 'SET_THEME', payload: systemTheme });
      }
    };
    media.addEventListener?.('change', handleMedia);
    return () => media.removeEventListener?.('change', handleMedia);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Persist user choice and update class without wiping other classes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(state.theme);
    try {
      console.log('theme', state.theme);
      
      localStorage.setItem('theme', state.theme);
    } catch {}
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