import {
  House,
  GridFour,
  Clock,
  UserCircle,
} from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import type { NavIconName, PhosphorWeight } from './types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

const iconMap: Record<NavIconName, PhosphorIcon> = {
  home: House,
  services: GridFour,
  activity: Clock,
  profile: UserCircle,
};

/** Inactive / active weight pairs per theme */
const themeNavWeights: Record<string, { inactive: PhosphorWeight; active: PhosphorWeight }> = {
  'material-you': { inactive: 'regular', active: 'fill' },
  'apple-ios': { inactive: 'regular', active: 'fill' },
  claude: { inactive: 'thin', active: 'light' },
  uber: { inactive: 'bold', active: 'fill' },
  'designers-choice': { inactive: 'bold', active: 'fill' },
  'dc-line-color': { inactive: 'bold', active: 'fill' },
  'dc-fill-color': { inactive: 'bold', active: 'fill' },
  premium: { inactive: 'regular', active: 'fill' },
  // Uber-inspired variations
  'uber-nightride': { inactive: 'regular', active: 'fill' },
  'uber-grid': { inactive: 'bold', active: 'fill' },
  'uber-signal': { inactive: 'light', active: 'regular' },
  'uber-soft': { inactive: 'regular', active: 'duotone' },
  'uber-mono': { inactive: 'light', active: 'bold' },
  // New variations
  'uber-dash': { inactive: 'bold', active: 'fill' },
  'uber-aura': { inactive: 'regular', active: 'fill' },
  'uber-matrix': { inactive: 'light', active: 'regular' },
};

interface NavIconProps {
  name: NavIconName;
  active?: boolean;
  size?: number;
  color?: string;
  className?: string;
}

export function NavIcon({ name, active = false, size = 24, color, className }: NavIconProps) {
  const { theme } = useTheme();
  const Icon = iconMap[name];
  if (!Icon) return null;

  const weights = themeNavWeights[theme.id] || { inactive: 'regular', active: 'fill' };
  const weight = active ? weights.active : weights.inactive;

  return (
    <Icon
      size={size}
      color={color ?? 'currentColor'}
      weight={weight}
      className={className}
    />
  );
}
