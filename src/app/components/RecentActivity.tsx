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
    statusText: 'AI calling plumbers near you...',
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

  if (theme.id === 'apple-ios') {
    return <AppleActivityView />;
  }

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
        <h2
          style={{
            fontFamily: headingFont,
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
          border:
            theme.id === 'claude' || theme.id === 'premium'
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
                  marginLeft: theme.id === 'uber' ? s.cardPadding : '56px',
                }}
              />
            )}
          </div>
        ))}
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

function InProgressRow({ activity }: { activity: ActivityItemData }) {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  const statusColor = c.statusActive || c.accent;
  const isUber = theme.id === 'uber';

  return (
    <div className="flex items-start gap-3">
      {!isUber && (
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
        Just now
      </span>
    </div>
  );
}

function ServedRow({ activity }: { activity: ActivityItemData }) {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  const servedColor = c.statusServed || '#34C759';
  const isUber = theme.id === 'uber';
  const isPremium = theme.id === 'premium';

  return (
    <div className="flex items-start gap-3">
      {!isUber && (
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
                    : isUber
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
