import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { themes } from './themes';
import { HomeScreen } from './screens/HomeScreen';

function ThemeSwitcher() {
  const { themeIndex, setThemeIndex, theme } = useTheme();
  const frameRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!frameRef.current) return;
    try {
      const dataUrl = await toPng(frameRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `fmg-${theme.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG:', err);
    }
  }, [theme.id]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          Find My Genie
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            marginTop: '6px',
          }}
        >
          16 Visual Directions
        </p>
      </div>

      {/* Theme Strip — Single Scrollable Row */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          maxWidth: '100%',
          marginBottom: '28px',
        }}
      >
        {themes.map((t, i) => {
          const isActive = i === themeIndex;
          // For white-accent themes, use ctaGreen as the button highlight color
          const buttonAccent = t.colors.accent === '#FFFFFF'
            ? (t.colors.ctaGreen || 'rgba(255,255,255,0.5)')
            : t.colors.accent;

          return (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Category dividers: after DC group (3), after Brand Directions (8), after Uber Variations (13) */}
              {(i === 3 || i === 8 || i === 13) && (
                <div
                  style={{
                    width: '1px',
                    height: '16px',
                    background: 'rgba(255,255,255,0.10)',
                    flexShrink: 0,
                    marginRight: '4px',
                  }}
                />
              )}
              <button
                onClick={() => setThemeIndex(i)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  background: isActive
                    ? `${buttonAccent}18`
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${buttonAccent}30`
                    : '1px solid transparent',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  scrollSnapAlign: 'center',
                }}
              >
                {t.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Theme Label */}
      <div
        className="flex items-center gap-3"
        style={{ marginBottom: '20px' }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: theme.colors.accent,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {theme.name} — {theme.mode} mode
        </span>
      </div>

      {/* Phone Preview */}
      <HomeScreen ref={frameRef} />

      {/* Download PNG Button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 24px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download PNG
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
