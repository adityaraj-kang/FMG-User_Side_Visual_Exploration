import {
  Truck,
  PipeWrench,
  Snowflake,
  Lightning,
  Tree,
  Hammer,
  HouseLine,
  Bug,
} from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import { ServiceIcon3D } from './ServiceIcon3D';
import { UniconsServiceIcon } from './UniconsServiceIcon';
import type { ServiceIconName, PhosphorWeight } from './types';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

const iconMap: Record<ServiceIconName, PhosphorIcon> = {
  Towing: Truck,
  Plumber: PipeWrench,
  HVAC: Snowflake,
  Electrician: Lightning,
  'Lawn Care': Tree,
  Handyman: Hammer,
  Roofing: HouseLine,
  'Pest Control': Bug,
};

const themeWeights: Record<string, PhosphorWeight> = {
  'material-you': 'regular',
  'apple-ios': 'regular',
  claude: 'thin',
  uber: 'bold',
  'designers-choice': 'light',
  'dc-line-color': 'regular',
  'dc-fill-color': 'fill',
  premium: 'regular',
  // Uber variations (3D SVG icons)
  'uber-nightride': 'regular',
  'uber-grid': 'bold',
  'uber-signal': 'light',
  'uber-soft': 'regular',
  'uber-mono': 'light',
  // New variations (Unicons)
  'uber-dash': 'bold',
  'uber-aura': 'regular',
  'uber-matrix': 'regular',
};

interface ServiceIconProps {
  name: ServiceIconName;
  size?: number;
  color?: string;
  className?: string;
}

export function ServiceIcon({ name, size = 24, color, className }: ServiceIconProps) {
  const { theme } = useTheme();

  // Use Unicons when theme specifies 'unicons' style
  if (theme.serviceIconStyle === 'unicons') {
    return (
      <UniconsServiceIcon
        name={name}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  // Use 3D image icons when the theme specifies a non-phosphor icon style
  if (theme.serviceIconStyle && theme.serviceIconStyle !== 'phosphor') {
    return (
      <ServiceIcon3D
        name={name}
        style={theme.serviceIconStyle}
        size={size}
        className={className}
      />
    );
  }

  // Default Phosphor rendering
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
