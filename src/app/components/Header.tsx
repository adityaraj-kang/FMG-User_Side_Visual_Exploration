import { useTheme } from '../context/ThemeContext';
import { UtilityIcon } from './icons';

export function Header() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const headingFont = t.fontFamilyHeading || t.fontFamily;
  const id = theme.id;

  // Uber-variation specific greeting styles
  const isUberVariation = id.startsWith('uber-');
  const isDC = id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color';

  return (
    <div
      className="flex items-start justify-between"
      style={{ padding: `20px ${s.screenPadding} 0` }}
    >
      <div className="flex-1 min-w-0" style={{ paddingRight: '16px' }}>
        {/* Location pin for Designer's Choice */}
        {isDC && (
          <div
            className="flex items-center"
            style={{
              gap: '4px',
              marginBottom: '6px',
            }}
          >
            <UtilityIcon name="mapPin" size={14} color={c.textTertiary} />
            <span
              style={{
                fontFamily: t.fontFamily,
                fontSize: '13px',
                fontWeight: 500,
                color: c.textTertiary,
                letterSpacing: '-0.01em',
              }}
            >
              Atlanta
            </span>
          </div>
        )}

        {/* Greeting — varies per theme */}
        {id === 'uber-mono' ? (
          <h1
            style={{
              fontFamily: t.fontFamily,
              fontSize: t.headingSize,
              fontWeight: t.headingWeight,
              letterSpacing: t.letterSpacing,
              color: c.textPrimary,
              lineHeight: 1.2,
            }}
          >
            {'> dinesh'}
            <span
              style={{
                color: c.accent,
                animation: 'blink 1s step-end infinite',
              }}
            >
              _
            </span>
          </h1>
        ) : id === 'uber-signal' ? (
          <h1
            style={{
              fontFamily: headingFont,
              fontSize: t.headingSize,
              fontWeight: t.headingWeight,
              letterSpacing: '0.04em',
              color: c.textPrimary,
              lineHeight: 1.1,
              textTransform: 'uppercase' as const,
            }}
          >
            DINESH
          </h1>
        ) : id === 'uber-soft' ? (
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontSize: '18px',
                fontWeight: 400,
                color: c.textSecondary,
                lineHeight: 1.3,
              }}
            >
              Good evening,
            </p>
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
              Dinesh
            </h1>
          </div>
        ) : id === 'uber-nightride' ? (
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
            Evening, Dinesh.
          </h1>
        ) : id === 'uber-grid' ? (
          <h1
            style={{
              fontFamily: t.fontFamily,
              fontSize: t.headingSize,
              fontWeight: t.headingWeight,
              letterSpacing: t.letterSpacing,
              color: c.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Hey Dinesh
          </h1>
        ) : id === 'uber-dash' ? (
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
            What do you need,{' '}
            <span style={{ color: c.accent }}>Dinesh?</span>
          </h1>
        ) : id === 'uber-aura' ? (
          <h1
            style={{
              fontFamily: t.fontFamily,
              fontSize: t.headingSize,
              fontWeight: t.headingWeight,
              letterSpacing: t.letterSpacing,
              color: c.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Dinesh.
          </h1>
        ) : id === 'uber-matrix' ? (
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
            Evening, Dinesh
          </h1>
        ) : isDC ? (
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
            What do you need,{' '}
            <span style={{ color: c.accent }}>Dinesh?</span>
          </h1>
        ) : (
          // Default greeting for original 5 themes
          <>
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
              {id === 'premium' ? (
                <span style={{ color: c.accent }}>Dinesh!</span>
              ) : (
                'Dinesh!'
              )}
            </h1>

            {id === 'apple-ios' && (
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
          </>
        )}
      </div>

      {/* Notification Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{
          width: '44px',
          height: '44px',
          borderRadius:
            id === 'material-you' || id === 'premium'
              ? '50%'
              : s.borderRadius,
          background:
            id === 'material-you'
              ? c.accentSoft
              : id === 'premium'
                ? c.surfaceElevated
                : id === 'uber' || isUberVariation
                  ? 'transparent'
                  : id === 'claude'
                    ? c.surfaceElevated
                    : 'transparent',
          border:
            id === 'claude' || id === 'premium'
              ? `1px solid ${c.border}`
              : 'none',
        }}
      >
        <UtilityIcon
          name="bell"
          size={20}
          color={
            id === 'material-you'
              ? c.accent
              : id === 'premium'
                ? c.accent
                : c.textPrimary
          }
        />
        {/* Red notification dot for Apple */}
        {id === 'apple-ios' && (
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

      {/* Blink animation for Mono terminal cursor */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
