import { ThemeProvider, useTheme } from './context/ThemeContext';
import { themes } from './themes';
import { HomeScreen } from './screens/HomeScreen';

function ThemeSwitcher() {
  const { themeIndex, setThemeIndex, theme } = useTheme();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '32px' }}>
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
          5 Visual Directions
        </p>
      </div>

      {/* Theme Tabs */}
      <div
        className="flex items-center gap-2 flex-wrap justify-center"
        style={{
          marginBottom: '36px',
          padding: '4px',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {themes.map((t, i) => {
          const isActive = i === themeIndex;
          return (
            <button
              key={t.id}
              onClick={() => setThemeIndex(i)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                background: isActive
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Theme Label */}
      <div
        className="flex items-center gap-3"
        style={{ marginBottom: '24px' }}
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
      <HomeScreen />
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
