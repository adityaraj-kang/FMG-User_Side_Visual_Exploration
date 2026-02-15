import type { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from './StatusBar';

export function MobileFrame({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        width: '393px',
        height: '852px',
        borderRadius: '44px',
        background: theme.colors.background,
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
        style={{
          width: '126px',
          height: '34px',
          borderRadius: '0 0 20px 20px',
          background: theme.mode === 'dark' ? '#000000' : '#000000',
        }}
      />

      {/* Status Bar */}
      <StatusBar />

      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="flex items-center justify-center shrink-0" style={{ height: '34px' }}>
        <div
          style={{
            width: '134px',
            height: '5px',
            borderRadius: '100px',
            background: theme.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.18)',
          }}
        />
      </div>
    </div>
  );
}
