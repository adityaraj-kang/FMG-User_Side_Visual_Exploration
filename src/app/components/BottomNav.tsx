import { useTheme } from '../context/ThemeContext';
import { NavIcon } from './icons';
import type { NavIconName } from './icons';

interface NavItem {
  label: string;
  iconName: NavIconName;
  isActive: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', iconName: 'home', isActive: true },
  { label: 'Services', iconName: 'services', isActive: false },
  { label: 'Activity', iconName: 'activity', isActive: false },
  { label: 'Profile', iconName: 'profile', isActive: false },
];

// Mono theme uses lowercase, developer-friendly labels
const monoLabels: Record<string, string> = {
  Home: 'home',
  Services: 'grid',
  Activity: 'logs',
  Profile: 'user',
};

export function BottomNav() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;

  const id = theme.id;
  const isMaterial = id === 'material-you';
  const isApple = id === 'apple-ios';
  const isUber = id === 'uber';
  const isPremium = id === 'premium';
  const isUberVariation = id.startsWith('uber-');
  const isDesignersChoice = id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color';
  const isMono = id === 'uber-mono';
  const isSoft = id === 'uber-soft';

  return (
    <div
      className="shrink-0"
      style={{
        background:
          isPremium
            ? c.surface
            : isUber || isUberVariation || isDesignersChoice
              ? c.background
              : isMaterial
                ? c.cardBg
                : isApple
                  ? '#FBFBFD'
                  : c.background,
        borderTop:
          isUber || isUberVariation || isDesignersChoice
            ? 'none'
            : isPremium
              ? `1px solid ${c.border}`
              : isApple
                ? '0.5px solid rgba(0,0,0,0.08)'
                : id === 'claude'
                  ? `0.5px solid ${c.border}`
                  : 'none',
        ...(isPremium && {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }),
        padding: '6px 0 0',
      }}
    >
      <div className="flex items-start justify-around">
        {navItems.map((item) => {
          const color = item.isActive ? c.navActive : c.navInactive;
          const label = isMono ? monoLabels[item.label] : item.label;

          return (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center relative"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding:
                  isMaterial ? '12px 0 8px' : '6px 0 8px',
                minWidth: '64px',
              }}
            >
              {/* Material You active pill */}
              {isMaterial && (
                <div
                  className="absolute"
                  style={{
                    top: '6px',
                    width: '64px',
                    height: '32px',
                    borderRadius: '16px',
                    background: item.isActive ? c.accentSoft : 'transparent',
                    transition: 'background 0.2s',
                  }}
                />
              )}

              {/* Soft theme active glow */}
              {isSoft && item.isActive && (
                <div
                  className="absolute"
                  style={{
                    top: '2px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${c.accentSoft} 0%, transparent 70%)`,
                  }}
                />
              )}

              <div className="relative z-10">
                <NavIcon
                  name={item.iconName}
                  active={item.isActive}
                  size={isApple ? 22 : 24}
                  color={color}
                />
              </div>

              <span
                className="relative z-10"
                style={{
                  fontFamily: t.fontFamily,
                  fontSize:
                    isApple ? '10px' : t.captionSize,
                  fontWeight:
                    item.isActive
                      ? (isMaterial ? 700 : isUber || isUberVariation ? 600 : 600)
                      : (isApple ? 400 : 500),
                  color,
                  marginTop: isMaterial ? '4px' : '2px',
                  letterSpacing: '0em',
                }}
              >
                {label}
              </span>

            </button>
          );
        })}
      </div>
    </div>
  );
}
