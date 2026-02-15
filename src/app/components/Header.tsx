import { useTheme } from '../context/ThemeContext';
import { UtilityIcon } from './icons';

export function Header() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const headingFont = t.fontFamilyHeading || t.fontFamily;

  return (
    <div
      className="flex items-start justify-between"
      style={{ padding: `20px ${s.screenPadding} 0` }}
    >
      <div className="flex-1 min-w-0" style={{ paddingRight: '16px' }}>
        {/* Greeting */}
        <h1
          style={{
            fontFamily: headingFont,
            fontSize: t.headingSize,
            fontWeight: t.headingWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
            lineHeight: 1.2,
          }}
        >
          Welcome back,{' '}
          {theme.id === 'premium' ? (
            <span style={{ color: c.accent }}>Dinesh!</span>
          ) : (
            'Dinesh!'
          )}
        </h1>

        {/* Subtitle for Apple */}
        {theme.id === 'apple-ios' && (
          <p
            style={{
              fontFamily: t.fontFamily,
              fontSize: '15px',
              fontWeight: 400,
              color: c.textSecondary,
              marginTop: '4px',
            }}
          >
            Here's what's happening
          </p>
        )}
      </div>

      {/* Notification Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{
          width: '44px',
          height: '44px',
          borderRadius:
            theme.id === 'material-you' || theme.id === 'premium'
              ? '50%'
              : theme.id === 'uber'
                ? s.borderRadius
                : s.borderRadius,
          background:
            theme.id === 'material-you'
              ? c.accentSoft
              : theme.id === 'premium'
                ? c.surfaceElevated
                : theme.id === 'uber'
                  ? 'transparent'
                  : theme.id === 'claude'
                    ? c.surfaceElevated
                    : 'transparent',
          border:
            theme.id === 'claude' || theme.id === 'premium'
              ? `1px solid ${c.border}`
              : 'none',
        }}
      >
        <UtilityIcon
          name="bell"
          size={20}
          color={
            theme.id === 'material-you'
              ? c.accent
              : theme.id === 'premium'
                ? c.accent
                : c.textPrimary
          }
        />
        {/* Red notification dot for Apple */}
        {theme.id === 'apple-ios' && (
          <div
            className="absolute"
            style={{
              top: '10px',
              right: '11px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF3B30',
              border: `2px solid ${c.surface}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
