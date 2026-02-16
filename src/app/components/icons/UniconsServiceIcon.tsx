import UilTruck from '@iconscout/react-unicons/icons/uil-truck';
import UilWrench from '@iconscout/react-unicons/icons/uil-wrench';
import UilSnowflake from '@iconscout/react-unicons/icons/uil-snowflake';
import UilBolt from '@iconscout/react-unicons/icons/uil-bolt';
import UilTrees from '@iconscout/react-unicons/icons/uil-trees';
import UilConstructor from '@iconscout/react-unicons/icons/uil-constructor';
import UilEstate from '@iconscout/react-unicons/icons/uil-estate';
import UilBug from '@iconscout/react-unicons/icons/uil-bug';
import type { ServiceIconName } from './types';

type UniconsComponent = React.ComponentType<{ size?: string | number; color?: string }>;

const uniconsMap: Record<ServiceIconName, UniconsComponent> = {
  Towing: UilTruck,
  Plumber: UilWrench,
  HVAC: UilSnowflake,
  Electrician: UilBolt,
  'Lawn Care': UilTrees,
  Handyman: UilConstructor,
  Roofing: UilEstate,
  'Pest Control': UilBug,
};

interface UniconsServiceIconProps {
  name: ServiceIconName;
  size?: number;
  color?: string;
  className?: string;
}

export function UniconsServiceIcon({ name, size = 24, color, className }: UniconsServiceIconProps) {
  const Icon = uniconsMap[name];
  if (!Icon) return null;

  return (
    <span className={className} style={{ display: 'inline-flex', lineHeight: 0 }}>
      <Icon size={size} color={color ?? 'currentColor'} />
    </span>
  );
}
