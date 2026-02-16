import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { services } from './ServiceIcons';
import { ServiceIcon } from './icons';
import { UtilityIcon } from './icons';

export function SuggestionsGrid() {
  const { theme } = useTheme();

  // iOS always uses its own list view
  if (theme.id === 'apple-ios') {
    return <AppleListView />;
  }

  // Route to layout-specific sub-components via token
  switch (theme.layout?.suggestionsStyle) {
    case 'horizontal-scroll':
      return <HorizontalScrollView />;
    case 'grid-2col':
      return <TwoColumnHeroView />;
    case 'pill-categories':
      return <PillCategoriesView />;
    case 'bento':
      return <BentoGridView />;
    case 'vertical-stack':
      return <VerticalStackView />;
    case 'chip-rows':
      return <ChipRowsView />;
    case 'floating-cards':
      return <FloatingCardsView />;
    case 'compact-tile-grid':
      return <CompactTileGridView />;
    default:
      return <DefaultGridView />;
  }
}

/* ─────────────────────────────────────────────
 * DEFAULT 4-COLUMN GRID (Material You, Claude, Uber, Premium)
 * ───────────────────────────────────────────── */
function DefaultGridView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;
  const isDC = theme.id === 'designers-choice' || theme.id === 'dc-line-color' || theme.id === 'dc-fill-color';

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          {isDC ? 'Top Services' : 'Suggestions'}
        </h2>
        <button
          className="flex items-center gap-0.5"
          style={{
            fontFamily: t.fontFamily,
            fontSize: '14px',
            fontWeight: 500,
            color: c.accent,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: theme.id === 'uber' || isDC ? 'underline' : 'none',
          }}
        >
          {theme.id === 'claude' ? 'View all' : 'See all'}
        </button>
      </div>

      <div className="grid grid-cols-4" style={{ gap: s.gridGap, rowGap: isDC || theme.id === 'material-you' ? '12px' : '20px' }}>
        {services.map((service) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          return (
            <div key={service.name} className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: s.iconContainerSize,
                  height: s.iconContainerSize,
                  borderRadius: theme.id === 'material-you' ? '50%' : s.borderRadius,
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
                    isDC
                      ? (theme.iconColors?.[service.name] || c.textSecondary)
                      : theme.id === 'material-you'
                        ? c.accent
                        : theme.id === 'uber'
                          ? '#FFFFFF'
                          : theme.id === 'premium'
                            ? c.accent
                            : iconColor
                  }
                />
              </div>
              <span
                className="text-center leading-tight"
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: '12px',
                  fontWeight: t.bodyWeight,
                  color: c.textSecondary,
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

/* ─────────────────────────────────────────────
 * APPLE iOS LIST VIEW
 * ───────────────────────────────────────────── */
function AppleListView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
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

      <div
        style={{
          background: c.cardBg,
          borderRadius: s.borderRadius,
          overflow: 'hidden',
        }}
      >
        {services.slice(0, 4).map((service, i) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          return (
            <div key={service.name}>
              <div
                className="flex items-center"
                style={{ padding: '12px 16px', minHeight: '44px' }}
              >
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
                <UtilityIcon name="chevronRight" size={18} color={c.textTertiary} strokeWidth={2.5} />
              </div>
              {i < 3 && (
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

/* ─────────────────────────────────────────────
 * NIGHTRIDE — HORIZONTAL SCROLL CARDS
 * ───────────────────────────────────────────── */
function HorizontalScrollView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;
  const cardHeight = theme.layout?.suggestionCardHeight || '152px';

  return (
    <div>
      {/* Section header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: `0 ${s.screenPadding}`, marginBottom: '16px' }}
      >
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          Services
        </h2>
        <button
          style={{
            fontFamily: t.fontFamily,
            fontSize: '14px',
            fontWeight: 500,
            color: c.textSecondary,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          See all
        </button>
      </div>

      {/* Scroll container with fade mask */}
      <div style={{ position: 'relative' }}>
        <div
          className="flex"
          style={{
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: s.gridGap,
            paddingLeft: s.screenPadding,
            paddingRight: '40px',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center justify-center shrink-0"
              style={{
                width: '136px',
                height: cardHeight,
                borderRadius: s.borderRadius,
                background: c.surface,
                scrollSnapAlign: 'start',
                gap: '12px',
                padding: s.cardPadding,
                boxShadow: theme.effects?.cardShadow || 'none',
              }}
            >
              <ServiceIcon name={service.name as any} size={64} />
              <span
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: '13px',
                  fontWeight: 500,
                  color: c.textSecondary,
                  textAlign: 'center',
                }}
              >
                {service.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right fade mask */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '100%',
            background: `linear-gradient(to right, transparent, ${c.background})`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* AI-Powered promo banner */}
      <div
        className="flex items-center"
        style={{
          margin: `14px ${s.screenPadding} 0`,
          padding: '10px 14px',
          borderRadius: s.borderRadius,
          background: c.surface,
          border: `1px solid ${c.border}`,
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: c.ctaGreen || c.accent,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: t.fontFamily,
            fontSize: '12px',
            fontWeight: 500,
            color: c.textSecondary,
          }}
        >
          AI negotiates 20+ vendors in 60s
        </span>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
 * GRID — 2-COLUMN HERO CARDS (collapsible)
 * ───────────────────────────────────────────── */
function TwoColumnHeroView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const [showAll, setShowAll] = useState(false);

  const cardHeight = theme.layout?.suggestionCardHeight || '128px';
  const displayedServices = showAll ? services : services.slice(0, 4);

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Grid */}
      <div
        className="grid grid-cols-2"
        style={{ gap: s.gridGap }}
      >
        {displayedServices.map((service) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          const tintBg = `${iconColor}0F`; // 6% opacity tint
          const subtitle = theme.serviceSubtitles?.[service.name];

          return (
            <div
              key={service.name}
              className="flex flex-col items-center justify-center"
              style={{
                height: cardHeight,
                borderRadius: s.borderRadius,
                background: tintBg,
                padding: s.cardPadding,
                gap: '8px',
              }}
            >
              <ServiceIcon name={service.name as any} size={48} />
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: t.bodySize,
                    fontWeight: 600,
                    color: c.textPrimary,
                    textAlign: 'center',
                  }}
                >
                  {service.name}
                </span>
                {subtitle && (
                  <span
                    style={{
                      fontFamily: t.fontFamily,
                      fontSize: t.captionSize,
                      fontWeight: 400,
                      color: c.textTertiary,
                      marginTop: '2px',
                    }}
                  >
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show all toggle */}
      <button
        onClick={() => setShowAll(!showAll)}
        style={{
          display: 'block',
          margin: '12px auto 0',
          fontFamily: t.fontFamily,
          fontSize: t.bodySize,
          fontWeight: 500,
          color: c.textSecondary,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        {showAll ? 'Show less' : `Show all ${services.length} services`}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SIGNAL — PILL CATEGORIES + DETAIL CARD
 * ───────────────────────────────────────────── */
function PillCategoriesView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;
  const [selectedService, setSelectedService] = useState(services[0].name);

  const pillRow1 = services.slice(0, 4);
  const pillRow2 = services.slice(4, 8);

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Two rows of pills */}
      {[pillRow1, pillRow2].map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex"
          style={{
            gap: s.gridGap,
            marginBottom: '10px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {row.map((service) => {
            const isSelected = service.name === selectedService;
            return (
              <button
                key={service.name}
                onClick={() => setSelectedService(service.name)}
                style={{
                  flexShrink: 0,
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: s.borderRadiusLg,
                  background: isSelected ? c.accent : '#1C1C1C',
                  border: isSelected ? 'none' : `1px solid ${c.border}`,
                  color: isSelected ? c.background : c.textSecondary,
                  fontFamily: t.fontFamily,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      ))}

      {/* Detail card for selected service — vertical layout */}
      <div
        style={{
          marginTop: '12px',
          padding: '16px',
          borderRadius: s.borderRadius,
          background: c.surface,
          borderTop: `2px solid ${c.accent}`,
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: '8px' }}>
          <ServiceIcon name={selectedService as any} size={48} />
          <span
            style={{
              fontFamily: headingFont,
              fontSize: '20px',
              fontWeight: t.headingWeight,
              color: c.textPrimary,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
            }}
          >
            {selectedService}
          </span>
          <span
            style={{
              fontFamily: t.fontFamily,
              fontSize: '12px',
              fontWeight: 400,
              color: c.textSecondary,
              lineHeight: 1.3,
            }}
          >
            AI finds 2 best deals in 60s
          </span>
          <button
            style={{
              width: '100%',
              height: '36px',
              marginTop: '4px',
              borderRadius: s.borderRadius,
              background: c.accent,
              color: c.background,
              border: 'none',
              fontFamily: t.fontFamily,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Get Quotes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * SOFT — BENTO GRID (mixed card sizes)
 * ───────────────────────────────────────────── */
function BentoGridView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;

  // Bento layout: [tall][std][std] / [cont][wide   ] / [std][std][link]
  // Only show 6 services in bento, with "View all" for the rest
  const bentoServices = services.slice(0, 6);

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          What can we help with?
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '72px 72px 72px',
          gap: '10px',
        }}
      >
        {bentoServices.map((service, i) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          const tintBg = `${iconColor}0F`;

          // Layout positions: 0 = tall (spans 2 rows), 3 = wide (spans 2 cols)
          const isTall = i === 0;
          const isWide = i === 3;

          const gridStyles: React.CSSProperties = {};
          if (isTall) {
            gridStyles.gridRow = '1 / 3';
            gridStyles.gridColumn = '1';
          } else if (isWide) {
            gridStyles.gridColumn = '2 / 4';
            gridStyles.gridRow = '2';
          }

          const iconSize = isTall ? 72 : isWide ? 48 : 52;

          return (
            <div
              key={service.name}
              className="flex flex-col items-center justify-center"
              style={{
                borderRadius: s.borderRadius,
                background: tintBg,
                padding: '12px',
                gap: '8px',
                boxShadow: theme.effects?.cardShadow || 'none',
                ...gridStyles,
              }}
            >
              <ServiceIcon name={service.name as any} size={iconSize} />
              <span
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: '12px',
                  fontWeight: 500,
                  color: c.textSecondary,
                  textAlign: 'center',
                }}
              >
                {service.name}
              </span>
            </div>
          );
        })}

        {/* View all link in the empty cell */}
        <div
          className="flex items-center justify-center"
          style={{
            gridRow: '3',
            gridColumn: '3',
            borderRadius: s.borderRadius,
            border: `1px dashed ${c.border}`,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: t.fontFamily,
              fontSize: '12px',
              fontWeight: 500,
              color: c.textTertiary,
            }}
          >
            View all →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * MONO — FULL-WIDTH VERTICAL STACK (terminal style)
 * ───────────────────────────────────────────── */
function VerticalStackView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Terminal-style section header */}
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            fontFamily: t.fontFamily,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            color: c.accent,
            letterSpacing: t.letterSpacing,
          }}
        >
          services.available({services.length})
        </span>
      </div>

      {/* Vertical list */}
      <div className="flex flex-col" style={{ gap: s.gridGap }}>
        {services.slice(0, 6).map((service) => (
          <div
            key={service.name}
            className="flex items-center"
            style={{
              height: '48px',
              padding: `0 ${s.cardPadding}`,
              borderRadius: s.borderRadius,
              background: c.surface,
              border: `1px solid ${c.border}`,
            }}
          >
            <ServiceIcon name={service.name as any} size={28} />
            <span
              className="flex-1"
              style={{
                fontFamily: t.fontFamily,
                fontSize: t.bodySize,
                fontWeight: t.bodyWeight,
                color: c.textPrimary,
                marginLeft: '12px',
              }}
            >
              {service.name}
            </span>
            <UtilityIcon name="chevronRight" size={16} color={c.textTertiary} />
          </div>
        ))}
      </div>
      {/* Terminal-style view all link */}
      <div
        style={{
          marginTop: '8px',
          fontFamily: t.fontFamily,
          fontSize: t.bodySize,
          fontWeight: t.bodyWeight,
          color: c.textTertiary,
          cursor: 'pointer',
        }}
      >
        {'> view_all --count=' + services.length}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * DASH — CHIP/PILL ROWS (horizontal scroll)
 * ───────────────────────────────────────────── */
function ChipRowsView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;

  const row1 = services.slice(0, 4);
  const row2 = services.slice(4, 8);
  const row3 = services.slice(0, 4); // Popular services repeated

  return (
    <div>
      {/* Section header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: `0 ${s.screenPadding}`, marginBottom: '14px' }}
      >
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          Quick Actions
        </h2>
      </div>

      {/* Three rows of chips */}
      {[row1, row2, row3].map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{ position: 'relative', marginBottom: '8px' }}
        >
          <div
            className="flex"
            style={{
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: '8px',
              paddingLeft: s.screenPadding,
              paddingRight: '40px',
              scrollbarWidth: 'none',
            }}
          >
            {row.map((service, i) => {
              const iconColor = theme.iconColors?.[service.name] || c.accent;
              return (
                <div
                  key={`${service.name}-${rowIdx}-${i}`}
                  className="flex items-center shrink-0"
                  style={{
                    height: '48px',
                    padding: '0 14px 0 8px',
                    borderRadius: '24px',
                    background: c.surface,
                    border: `1px solid ${c.border}`,
                    gap: '8px',
                    scrollSnapAlign: 'start',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: `${iconColor}18`,
                    }}
                  >
                    <ServiceIcon name={service.name as any} size={18} color={iconColor} />
                  </div>
                  <span
                    style={{
                      fontFamily: t.fontFamily,
                      fontSize: '13px',
                      fontWeight: 500,
                      color: c.textPrimary,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right fade mask */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40px',
              height: '100%',
              background: `linear-gradient(to right, transparent, ${c.background})`,
              pointerEvents: 'none',
            }}
          />
        </div>
      ))}

      {/* Popular Near You — compact 2-item list */}
      <div style={{ padding: `0 ${s.screenPadding}` }}>
        <span
          style={{
            fontFamily: t.fontFamily,
            fontSize: '11px',
            fontWeight: 600,
            color: c.textTertiary,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
          }}
        >
          Popular near you
        </span>
        <div className="flex flex-col" style={{ marginTop: '4px' }}>
          {services.slice(0, 2).map((service) => {
            const iconColor = theme.iconColors?.[service.name] || c.accent;
            return (
              <div
                key={`popular-${service.name}`}
                className="flex items-center"
                style={{
                  height: '30px',
                  padding: '0 4px',
                  cursor: 'pointer',
                }}
              >
                <ServiceIcon name={service.name as any} size={14} color={iconColor} />
                <span
                  className="flex-1"
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: '12px',
                    fontWeight: 500,
                    color: c.textSecondary,
                    marginLeft: '8px',
                  }}
                >
                  {service.name}
                </span>
                <UtilityIcon name="chevronRight" size={12} color={c.textTertiary} />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
 * AURA — FLOATING CARDS (premium single column)
 * ───────────────────────────────────────────── */
function FloatingCardsView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const visibleServices = services.slice(0, 3);

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Section header */}
      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontFamily: t.fontFamily,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: '0.06em',
            color: c.textTertiary,
            textTransform: 'uppercase' as const,
          }}
        >
          Services
        </h2>
      </div>

      {/* Floating cards */}
      <div className="flex flex-col" style={{ gap: s.gridGap }}>
        {visibleServices.map((service) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          return (
            <div
              key={service.name}
              className="flex items-center"
              style={{
                height: '56px',
                padding: `0 ${s.cardPadding}`,
                borderRadius: s.borderRadius,
                background: c.surface,
                border: `1px solid ${c.border}`,
                boxShadow: theme.effects?.cardShadow || 'none',
                cursor: 'pointer',
              }}
            >
              <ServiceIcon name={service.name as any} size={20} color={iconColor} />
              <span
                className="flex-1"
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: t.bodySize,
                  fontWeight: 500,
                  color: c.textPrimary,
                  marginLeft: '14px',
                  letterSpacing: t.letterSpacing,
                }}
              >
                {service.name}
              </span>
              <UtilityIcon name="chevronRight" size={16} color={c.textTertiary} />
            </div>
          );
        })}
      </div>

      {/* See all link */}
      <button
        style={{
          display: 'block',
          margin: '14px auto 0',
          fontFamily: t.fontFamily,
          fontSize: '13px',
          fontWeight: 500,
          color: c.accent,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: t.letterSpacing,
        }}
      >
        See all {services.length} services
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * MATRIX — COMPACT 3-COL TILE GRID
 * ───────────────────────────────────────────── */
function CompactTileGridView() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const headingFont = t.fontFamilyHeading || t.fontFamily;

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      {/* Section header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: c.textPrimary,
          }}
        >
          Services
        </h2>
        <button
          style={{
            fontFamily: t.fontFamily,
            fontSize: '12px',
            fontWeight: 500,
            color: c.textTertiary,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          View all
        </button>
      </div>

      {/* 3-col grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: s.gridGap,
        }}
      >
        {services.map((service) => {
          const iconColor = theme.iconColors?.[service.name] || c.accent;
          return (
            <div
              key={service.name}
              className="flex flex-col justify-center"
              style={{
                height: '88px',
                padding: '10px 10px 10px 13px',
                borderRadius: s.borderRadius,
                background: c.surface,
                borderLeft: `3px solid ${iconColor}`,
                cursor: 'pointer',
              }}
            >
              <ServiceIcon name={service.name as any} size={22} color={iconColor} />
              <span
                style={{
                  fontFamily: t.fontFamily,
                  fontSize: '11px',
                  fontWeight: 500,
                  color: c.textSecondary,
                  marginTop: '6px',
                  lineHeight: 1.2,
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
