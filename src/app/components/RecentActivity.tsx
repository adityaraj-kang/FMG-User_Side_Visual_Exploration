import { useTheme } from '../context/ThemeContext';
import { ServiceIcon } from './icons';
import { UtilityIcon } from './icons';
import type { ActivityItemData } from '../types/theme';

const activities: ActivityItemData[] = [
  {
    id: '1',
    serviceType: 'Plumber',
    status: 'in-progress',
    vendorCount: 12,
    statusText: 'Genie calling plumbers near you...',
  },
  {
    id: '2',
    serviceType: 'Towing',
    status: 'served',
    deals: [
      { vendorName: "Mike's Towing", price: '$85', label: 'cheapest' },
      { vendorName: 'QuickFix Pro', eta: '15 min', label: 'fastest' },
    ],
    completedAt: '2h ago',
  },
];

export function RecentActivity() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const headingFont = t.fontFamilyHeading || t.fontFamily;
  const id = theme.id;
  const activityStyle = theme.layout?.activityStyle || 'standard';

  if (id === 'apple-ios') {
    return <AppleActivityView />;
  }

  // Section header text varies by theme
  const sectionTitle = id === 'uber-mono'
    ? 'recent.activity'
    : id === 'uber-signal'
      ? 'Recent'
      : id === 'uber-grid'
        ? 'Activity'
        : 'Recent Activity';

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
        <h2
          style={{
            fontFamily: id === 'uber-mono' ? t.fontFamily : headingFont,
            fontSize: t.sectionSize,
            fontWeight: t.sectionWeight,
            letterSpacing: t.letterSpacing,
            color: id === 'uber-mono' ? c.accent : c.textPrimary,
            textTransform: id === 'uber-signal' ? 'uppercase' as const : 'none' as const,
          }}
        >
          {sectionTitle}
        </h2>
      </div>

      {/* Card style: separate cards per activity (Soft) */}
      {activityStyle === 'card' ? (
        <div className="flex flex-col" style={{ gap: '12px' }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                background: c.cardBg,
                borderRadius: s.borderRadius,
                padding: s.cardPadding,
                boxShadow: theme.effects?.cardShadow || 'none',
              }}
            >
              {activity.status === 'in-progress' ? (
                <InProgressRow activity={activity} />
              ) : (
                <ServedRow activity={activity} />
              )}
            </div>
          ))}
        </div>
      ) : activityStyle === 'timeline' ? (
        /* Timeline style: left accent bar (Nightride) */
        <div
          style={{
            background: c.cardBg,
            borderRadius: s.borderRadius,
            overflow: 'hidden',
          }}
        >
          {activities.map((activity, i) => {
            const barColor = activity.status === 'in-progress'
              ? (c.statusActive || c.accent)
              : (c.statusServed || '#06C167');
            return (
              <div key={activity.id}>
                <div
                  style={{
                    padding: s.cardPadding,
                    borderLeft: `2px solid ${barColor}`,
                  }}
                >
                  {activity.status === 'in-progress' ? (
                    <InProgressRow activity={activity} />
                  ) : (
                    <ServedRow activity={activity} />
                  )}
                </div>
                {i < activities.length - 1 && (
                  <div style={{ height: '0.5px', background: c.divider, marginLeft: s.cardPadding }} />
                )}
              </div>
            );
          })}
        </div>
      ) : activityStyle === 'minimal' ? (
        /* Minimal style: bare rows, no card wrapper (Grid, Signal, Mono) */
        <div>
          {activities.map((activity, i) => (
            <div key={activity.id}>
              <div style={{ padding: `${s.cardPadding} 0` }}>
                {id === 'uber-mono' ? (
                  <MonoActivityRow activity={activity} />
                ) : activity.status === 'in-progress' ? (
                  <InProgressRow activity={activity} />
                ) : (
                  <ServedRow activity={activity} />
                )}
              </div>
              {i < activities.length - 1 && (
                <div style={{ height: '0.5px', background: c.divider }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Standard style: grouped card (original themes) */
        <div
          style={{
            background: c.cardBg,
            borderRadius: s.borderRadius,
            border:
              id === 'claude' || id === 'premium'
                ? `1px solid ${c.border}`
                : 'none',
            boxShadow: theme.effects?.cardShadow || 'none',
            overflow: 'hidden',
          }}
        >
          {activities.map((activity, i) => (
            <div key={activity.id}>
              <div style={{ padding: s.cardPadding }}>
                {activity.status === 'in-progress' ? (
                  <InProgressRow activity={activity} />
                ) : (
                  <ServedRow activity={activity} />
                )}
              </div>
              {i < activities.length - 1 && (
                <div
                  style={{
                    height: '0.5px',
                    background: c.divider,
                    marginLeft: id === 'uber' || id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color' ? s.cardPadding : '56px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

/* ─── Mono terminal-style activity row ─── */
function MonoActivityRow({ activity }: { activity: ActivityItemData }) {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  if (activity.status === 'in-progress') {
    return (
      <div>
        <p style={{ fontFamily: t.fontFamily, fontSize: t.bodySize, color: c.textPrimary }}>
          <span style={{ color: c.textTertiary }}>{'> '}</span>
          {activity.serviceType.toLowerCase()}: scanning...{' '}
          <span style={{ color: c.accent }}>{'[||||'}</span>
          <span style={{ color: c.textTertiary }}>{'..]'}</span>
          <span style={{ fontFamily: t.fontFamily, fontSize: t.captionSize, color: c.textTertiary, marginLeft: '8px' }}>now</span>
        </p>
      </div>
    );
  }

  // Served
  return (
    <div>
      <p style={{ fontFamily: t.fontFamily, fontSize: t.bodySize, color: c.textPrimary }}>
        <span style={{ color: c.textTertiary }}>{'> '}</span>
        {activity.serviceType.toLowerCase()}: resolved{' '}
        <span style={{ color: c.accent }}>[ok]</span>{' '}
        {activity.deals && (
          <span style={{ color: c.textSecondary }}>
            [{activity.deals[0].price}, {activity.deals[1].eta}]
          </span>
        )}
        <span style={{ fontFamily: t.fontFamily, fontSize: t.captionSize, color: c.textTertiary, marginLeft: '8px' }}>
          {activity.completedAt}
        </span>
      </p>
    </div>
  );
}

/* ─── In-progress row (shared by most styles) ─── */
function InProgressRow({ activity }: { activity: ActivityItemData }) {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  const isDesignersChoice = theme.id === 'designers-choice' || theme.id === 'dc-line-color' || theme.id === 'dc-fill-color';
  const statusColor = isDesignersChoice ? '#FF4D00' : (c.statusActive || c.accent);
  const isUber = theme.id === 'uber';
  const isUberVariation = theme.id.startsWith('uber-');
  const hideIcon = isUber || isUberVariation || isDesignersChoice;

  return (
    <div className="flex items-start gap-3">
      {!hideIcon && (
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: theme.id === 'material-you' ? '50%' : '10px',
            background: c.accentSoft,
          }}
        >
          <ServiceIcon
            name={activity.serviceType as any}
            size={20}
            color={statusColor}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: statusColor,
              animation: 'pulse 2s infinite',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: t.fontFamily,
              fontSize: t.bodySize,
              fontWeight: 500,
              color: c.textPrimary,
              lineHeight: 1.3,
            }}
          >
            {activity.serviceType} Request
          </p>
        </div>
        <p
          style={{
            fontFamily: t.fontFamily,
            fontSize: '13px',
            fontWeight: 400,
            color: statusColor,
            marginTop: '3px',
            lineHeight: 1.3,
          }}
        >
          {activity.statusText}
        </p>
        {activity.vendorCount && (
          <p
            style={{
              fontFamily: t.fontFamily,
              fontSize: '12px',
              fontWeight: 400,
              color: c.textTertiary,
              marginTop: '2px',
            }}
          >
            Negotiating with {activity.vendorCount} vendors
          </p>
        )}
      </div>
      <span
        className="shrink-0"
        style={{
          fontFamily: t.fontFamily,
          fontSize: t.captionSize,
          color: c.textTertiary,
        }}
      >
        {isDesignersChoice ? 'Requested 2 min ago' : 'Just now'}
      </span>
    </div>
  );
}

/* ─── Served row (shared by most styles) ─── */
function ServedRow({ activity }: { activity: ActivityItemData }) {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  const servedColor = c.statusServed || '#34C759';
  const isUber = theme.id === 'uber';
  const isPremium = theme.id === 'premium';
  const isUberVariation = theme.id.startsWith('uber-');
  const isDesignersChoice = theme.id === 'designers-choice' || theme.id === 'dc-line-color' || theme.id === 'dc-fill-color';
  const hideIcon = isUber || isUberVariation || isDesignersChoice;

  return (
    <div className="flex items-start gap-3">
      {!hideIcon && (
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: theme.id === 'material-you' ? '50%' : '10px',
            background: c.surfaceElevated,
          }}
        >
          <ServiceIcon
            name={activity.serviceType as any}
            size={20}
            color={c.textSecondary}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <UtilityIcon name="check" size={14} color={servedColor} strokeWidth={2.5} />
          <p
            style={{
              fontFamily: t.fontFamily,
              fontSize: t.bodySize,
              fontWeight: 500,
              color: c.textPrimary,
              lineHeight: 1.3,
            }}
          >
            {activity.serviceType} — Deals Found
          </p>
        </div>
        {activity.deals?.map((deal, di) => (
          <p
            key={di}
            style={{
              fontFamily: t.fontFamily,
              fontSize: '12px',
              fontWeight: 400,
              color: c.textSecondary,
              marginTop: di === 0 ? '4px' : '1px',
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color:
                  isPremium
                    ? c.accent
                    : isUber || isUberVariation || isDesignersChoice
                      ? (c.ctaGreen || '#06C167')
                      : servedColor,
                fontSize: '11px',
                letterSpacing: '0.02em',
              }}
            >
              {deal.label === 'cheapest' ? 'Best Price' : 'Fastest'}:
            </span>{' '}
            {deal.price || deal.eta} · {deal.vendorName}
          </p>
        ))}
      </div>
      <span
        className="shrink-0"
        style={{
          fontFamily: t.fontFamily,
          fontSize: t.captionSize,
          color: c.textTertiary,
        }}
      >
        {activity.completedAt}
      </span>
    </div>
  );
}

/* ─── Apple iOS activity view ─── */
function AppleActivityView() {
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
          Recent Activity
        </h2>
      </div>

      <div
        style={{
          background: c.cardBg,
          borderRadius: s.borderRadius,
          overflow: 'hidden',
        }}
      >
        {activities.map((activity, i) => {
          const iconColor = theme.iconColors?.[activity.serviceType] || c.accent;

          return (
            <div key={activity.id}>
              <div
                className="flex items-start"
                style={{
                  padding: '12px 16px',
                  minHeight: '60px',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '7px',
                    background: `${iconColor}18`,
                    marginTop: '2px',
                  }}
                >
                  <ServiceIcon
                    name={activity.serviceType as any}
                    size={18}
                    color={iconColor}
                  />
                </div>

                <div className="flex-1 min-w-0" style={{ marginLeft: '14px' }}>
                  {activity.status === 'in-progress' ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: c.accent,
                            animation: 'pulse 2s infinite',
                          }}
                        />
                        <p
                          style={{
                            fontFamily: t.fontFamily,
                            fontSize: '17px',
                            fontWeight: 400,
                            color: c.textPrimary,
                            lineHeight: 1.3,
                          }}
                        >
                          {activity.serviceType} Request
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: t.fontFamily,
                          fontSize: '15px',
                          fontWeight: 400,
                          color: c.accent,
                          marginTop: '1px',
                          lineHeight: 1.3,
                        }}
                      >
                        {activity.statusText}
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          fontFamily: t.fontFamily,
                          fontSize: '17px',
                          fontWeight: 400,
                          color: c.textPrimary,
                          lineHeight: 1.3,
                        }}
                      >
                        {activity.serviceType} — Deals Found
                      </p>
                      {activity.deals?.map((deal, di) => (
                        <p
                          key={di}
                          style={{
                            fontFamily: t.fontFamily,
                            fontSize: '13px',
                            fontWeight: 400,
                            color: c.textSecondary,
                            marginTop: di === 0 ? '3px' : '1px',
                            lineHeight: 1.3,
                          }}
                        >
                          <span style={{ color: deal.label === 'cheapest' ? '#34C759' : c.accent, fontWeight: 500 }}>
                            {deal.label === 'cheapest' ? 'Best Price' : 'Fastest'}:
                          </span>{' '}
                          {deal.price || deal.eta} · {deal.vendorName}
                        </p>
                      ))}
                    </>
                  )}
                </div>

                <span
                  className="shrink-0"
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: '15px',
                    color: c.textTertiary,
                  }}
                >
                  {activity.status === 'in-progress' ? 'Just now' : activity.completedAt}
                </span>
              </div>

              {i < activities.length - 1 && (
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
