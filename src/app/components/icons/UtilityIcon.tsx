import {
  Bell,
  Sparkle,
  ChatCircle,
  MagnifyingGlass,
  ArrowUp,
  Microphone,
  CaretRight,
  Check,
  MapPin,
} from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import type { UtilityIconName, PhosphorWeight } from './types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

const iconMap: Record<UtilityIconName, PhosphorIcon> = {
  bell: Bell,
  sparkles: Sparkle,
  messageCircle: ChatCircle,
  search: MagnifyingGlass,
  arrowUp: ArrowUp,
  mic: Microphone,
  chevronRight: CaretRight,
  check: Check,
  mapPin: MapPin,
};

const themeWeights: Record<string, PhosphorWeight> = {
  'material-you': 'regular',
  'apple-ios': 'regular',
  claude: 'thin',
  uber: 'bold',
  'designers-choice': 'light',
  'dc-line-color': 'light',
  'dc-fill-color': 'light',
  premium: 'regular',
  // Uber-inspired variations
  'uber-nightride': 'regular',
  'uber-grid': 'bold',
  'uber-signal': 'light',
  'uber-soft': 'regular',
  'uber-mono': 'light',
  // New variations
  'uber-dash': 'bold',
  'uber-aura': 'regular',
  'uber-matrix': 'light',
};

interface UtilityIconProps {
  name: UtilityIconName;
  size?: number;
  color?: string;
  strokeWidth?: number; // kept for API compat but ignored — Phosphor uses weight
  className?: string;
}

export function UtilityIcon({ name, size = 24, color, className }: UtilityIconProps) {
  const { theme } = useTheme();
  const Icon = iconMap[name];
  if (!Icon) return null;

  const weight = themeWeights[theme.id] || 'regular';

  return (
    <Icon
      size={size}
      color={color ?? 'currentColor'}
      weight={weight}
      className={className}
    />
  );
}
