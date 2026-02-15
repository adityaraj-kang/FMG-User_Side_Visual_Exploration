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

export function BottomNav() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;

  const isMaterial = theme.id === 'material-you';
  const isApple = theme.id === 'apple-ios';
  const isUber = theme.id === 'uber';
  const isPremium = theme.id === 'premium';

  return (
    <div
      className="shrink-0"
      style={{
        background:
          isPremium
            ? c.surface
            : isUber
              ? c.background
              : isMaterial
                ? c.cardBg
                : isApple
                  ? '#FBFBFD'
                  : c.background,
        borderTop:
          isUber
            ? 'none'
            : isPremium
              ? `1px solid ${c.border}`
              : isApple
                ? '0.5px solid rgba(0,0,0,0.08)'
                : theme.id === 'claude'
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
                      ? (isMaterial ? 700 : isUber ? 600 : 600)
                      : (isApple ? 400 : 500),
                  color,
                  marginTop: isMaterial ? '4px' : '2px',
                  letterSpacing: '0em',
                }}
              >
                {item.label}
              </span>

            </button>
          );
        })}
      </div>
    </div>
  );
}
