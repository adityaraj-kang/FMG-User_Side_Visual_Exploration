import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ThemeTokens } from '../types/theme';
import { themes } from '../themes';

interface ThemeContextValue {
  theme: ThemeTokens;
  setThemeById: (id: string) => void;
  themeIndex: number;
  setThemeIndex: (i: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = themes[themeIndex];

  const setThemeById = (id: string) => {
    const idx = themes.findIndex((t) => t.id === id);
    if (idx !== -1) setThemeIndex(idx);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeById, themeIndex, setThemeIndex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
