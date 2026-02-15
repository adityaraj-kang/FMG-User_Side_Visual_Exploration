import {
  Bell,
  Sparkle,
  ChatCircle,
  MagnifyingGlass,
  ArrowUp,
  Microphone,
  CaretRight,
  Check,
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
};

const themeWeights: Record<string, PhosphorWeight> = {
  'material-you': 'regular',
  'apple-ios': 'regular',
  claude: 'thin',
  uber: 'bold',
  premium: 'regular',
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
