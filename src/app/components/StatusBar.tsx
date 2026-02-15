import { useTheme } from '../context/ThemeContext';
import { CellSignalFull, WifiHigh, BatteryFull } from '@phosphor-icons/react';

export function StatusBar() {
  const { theme } = useTheme();
  const color = theme.mode === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <div
      className="flex items-center justify-between w-full shrink-0"
      style={{
        padding: '12px 24px 8px',
        fontFamily: theme.typography.fontFamily,
        color,
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em' }}>
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <CellSignalFull size={15} weight="fill" color={color} />
        <WifiHigh size={16} weight="fill" color={color} />
        <BatteryFull size={22} weight="fill" color={color} />
      </div>
    </div>
  );
}
