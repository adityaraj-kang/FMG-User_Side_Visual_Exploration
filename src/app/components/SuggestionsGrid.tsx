import { useTheme } from '../context/ThemeContext';
import { services } from './ServiceIcons';
import { ServiceIcon } from './icons';
import { UtilityIcon } from './icons';

export function SuggestionsGrid() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const headingFont = t.fontFamilyHeading || t.fontFamily;

  // iOS renders as a list, everything else as grid
  if (theme.id === 'apple-ios') {
    return <AppleListView />;
  }

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Section Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          Suggestions
        </h2>
        <button
          className="flex items-center gap-0.5"
          style={{
            fontFamily: t.fontFamily,
            fontSize: theme.id === 'claude' ? '14px' : '14px',
            fontWeight: 500,
            color: c.accent,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: theme.id === 'uber' ? 'underline' : 'none',
          }}
        >
          {theme.id === 'claude' ? 'View all' : 'See all'}
        </button>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-4"
        style={{ gap: s.gridGap }}
      >
        {services.map((service) => {
          const iconColor =
            theme.iconColors?.[service.name] || c.accent;

          return (
            <div
              key={service.name}
              className="flex flex-col items-center gap-2"
            >
              {/* Icon Container */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: s.iconContainerSize,
                  height: s.iconContainerSize,
                  borderRadius:
                    theme.id === 'material-you'
                      ? '50%'
                      : s.borderRadius,
                  background: c.iconBg,
                  border:
                    theme.id === 'claude' || theme.id === 'premium'
                      ? `1px solid ${c.border}`
                      : 'none',
                }}
              >
                <ServiceIcon
                  name={service.name as any}
                  size={parseInt(s.iconSize)}
                  color={
                    theme.id === 'material-you'
                      ? c.accent
                      : theme.id === 'uber'
                        ? '#FFFFFF'
                        : theme.id === 'premium'
                          ? c.accent
                          : iconColor
                  }
                />
              </div>

              {/* Label */}
              <span
                className="text-center leading-tight"
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: theme.id === 'uber' ? '12px' : '12px',
                  fontWeight: t.bodyWeight,
                  color:
                    theme.id === 'uber'
                      ? c.textSecondary
                      : c.textSecondary,
                  maxWidth: s.iconContainerSize,
                }}
              >
                {service.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppleListView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Section Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
        <h2
          style={{
            fontFamily: t.fontFamily,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          Suggestions
        </h2>
        <button
          className="flex items-center"
          style={{
            fontFamily: t.fontFamily,
            fontSize: '17px',
            fontWeight: 400,
            color: c.accent,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          See All
          <UtilityIcon name="chevronRight" size={18} color={c.accent} strokeWidth={2} />
        </button>
      </div>

      {/* Grouped Card */}
      <div
        style={{
          background: c.cardBg,
          borderRadius: s.borderRadius,
          overflow: 'hidden',
        }}
      >
        {services.map((service, i) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;

          return (
            <div key={service.name}>
              <div
                className="flex items-center"
                style={{
                  padding: '12px 16px',
                  minHeight: '44px',
                }}
              >
                {/* Colored icon container */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '7px',
                    background: `${iconColor}18`,
                  }}
                >
                  <ServiceIcon name={service.name as any} size={18} color={iconColor} />
                </div>

                {/* Label */}
                <span
                  className="flex-1"
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: '17px',
                    fontWeight: 400,
                    color: c.textPrimary,
                    marginLeft: '14px',
                  }}
                >
                  {service.name}
                </span>

                {/* Chevron */}
                <UtilityIcon name="chevronRight" size={18} color={c.textTertiary} strokeWidth={2.5} />
              </div>

              {/* Inset separator */}
              {i < services.length - 1 && (
                <div
                  style={{
                    height: '0.5px',
                    background: c.divider,
                    marginLeft: '62px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
