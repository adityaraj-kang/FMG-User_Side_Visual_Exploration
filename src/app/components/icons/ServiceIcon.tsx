import {
  Truck,
  PipeWrench,
  Snowflake,
  Lightning,
  Tree,
  Hammer,
  HouseSimple,
  Bug,
} from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import type { ServiceIconName, PhosphorWeight } from './types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

const iconMap: Record<ServiceIconName, PhosphorIcon> = {
  Towing: Truck,
  Plumber: PipeWrench,
  HVAC: Snowflake,
  Electrician: Lightning,
  'Lawn Care': Tree,
  Handyman: Hammer,
  Roofing: HouseSimple,
  'Pest Control': Bug,
};

const themeWeights: Record<string, PhosphorWeight> = {
  'material-you': 'regular',
  'apple-ios': 'regular',
  claude: 'thin',
  uber: 'bold',
  premium: 'regular',
};

interface ServiceIconProps {
  name: ServiceIconName;
  size?: number;
  color?: string;
  className?: string;
}

export function ServiceIcon({ name, size = 24, color, className }: ServiceIconProps) {
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
