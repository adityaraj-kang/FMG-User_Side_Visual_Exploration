import type { ServiceIconName } from './types';

// Import all icon assets by style
// Glossy (Nightride)
import glossyTowing from '../../../assets/icons/glossy/towing.svg';
import glossyPlumber from '../../../assets/icons/glossy/plumber.svg';
import glossyHvac from '../../../assets/icons/glossy/hvac.svg';
import glossyElectrician from '../../../assets/icons/glossy/electrician.svg';
import glossyLawnCare from '../../../assets/icons/glossy/lawn-care.svg';
import glossyHandyman from '../../../assets/icons/glossy/handyman.svg';
import glossyRoofing from '../../../assets/icons/glossy/roofing.svg';
import glossyPestControl from '../../../assets/icons/glossy/pest-control.svg';

// Flat (Grid)
import flatTowing from '../../../assets/icons/flat/towing.svg';
import flatPlumber from '../../../assets/icons/flat/plumber.svg';
import flatHvac from '../../../assets/icons/flat/hvac.svg';
import flatElectrician from '../../../assets/icons/flat/electrician.svg';
import flatLawnCare from '../../../assets/icons/flat/lawn-care.svg';
import flatHandyman from '../../../assets/icons/flat/handyman.svg';
import flatRoofing from '../../../assets/icons/flat/roofing.svg';
import flatPestControl from '../../../assets/icons/flat/pest-control.svg';

// Outlined (Signal)
import outlinedTowing from '../../../assets/icons/outlined/towing.svg';
import outlinedPlumber from '../../../assets/icons/outlined/plumber.svg';
import outlinedHvac from '../../../assets/icons/outlined/hvac.svg';
import outlinedElectrician from '../../../assets/icons/outlined/electrician.svg';
import outlinedLawnCare from '../../../assets/icons/outlined/lawn-care.svg';
import outlinedHandyman from '../../../assets/icons/outlined/handyman.svg';
import outlinedRoofing from '../../../assets/icons/outlined/roofing.svg';
import outlinedPestControl from '../../../assets/icons/outlined/pest-control.svg';

// Clay (Soft)
import clayTowing from '../../../assets/icons/clay/towing.svg';
import clayPlumber from '../../../assets/icons/clay/plumber.svg';
import clayHvac from '../../../assets/icons/clay/hvac.svg';
import clayElectrician from '../../../assets/icons/clay/electrician.svg';
import clayLawnCare from '../../../assets/icons/clay/lawn-care.svg';
import clayHandyman from '../../../assets/icons/clay/handyman.svg';
import clayRoofing from '../../../assets/icons/clay/roofing.svg';
import clayPestControl from '../../../assets/icons/clay/pest-control.svg';

// Isometric (Mono)
import isoTowing from '../../../assets/icons/isometric/towing.svg';
import isoPlumber from '../../../assets/icons/isometric/plumber.svg';
import isoHvac from '../../../assets/icons/isometric/hvac.svg';
import isoElectrician from '../../../assets/icons/isometric/electrician.svg';
import isoLawnCare from '../../../assets/icons/isometric/lawn-care.svg';
import isoHandyman from '../../../assets/icons/isometric/handyman.svg';
import isoRoofing from '../../../assets/icons/isometric/roofing.svg';
import isoPestControl from '../../../assets/icons/isometric/pest-control.svg';

type IconStyle = '3d-glossy' | 'flat-vivid' | 'gradient-outlined' | '3d-clay' | '3d-isometric';

const iconAssets: Record<IconStyle, Record<ServiceIconName, string>> = {
  '3d-glossy': {
    Towing: glossyTowing,
    Plumber: glossyPlumber,
    HVAC: glossyHvac,
    Electrician: glossyElectrician,
    'Lawn Care': glossyLawnCare,
    Handyman: glossyHandyman,
    Roofing: glossyRoofing,
    'Pest Control': glossyPestControl,
  },
  'flat-vivid': {
    Towing: flatTowing,
    Plumber: flatPlumber,
    HVAC: flatHvac,
    Electrician: flatElectrician,
    'Lawn Care': flatLawnCare,
    Handyman: flatHandyman,
    Roofing: flatRoofing,
    'Pest Control': flatPestControl,
  },
  'gradient-outlined': {
    Towing: outlinedTowing,
    Plumber: outlinedPlumber,
    HVAC: outlinedHvac,
    Electrician: outlinedElectrician,
    'Lawn Care': outlinedLawnCare,
    Handyman: outlinedHandyman,
    Roofing: outlinedRoofing,
    'Pest Control': outlinedPestControl,
  },
  '3d-clay': {
    Towing: clayTowing,
    Plumber: clayPlumber,
    HVAC: clayHvac,
    Electrician: clayElectrician,
    'Lawn Care': clayLawnCare,
    Handyman: clayHandyman,
    Roofing: clayRoofing,
    'Pest Control': clayPestControl,
  },
  '3d-isometric': {
    Towing: isoTowing,
    Plumber: isoPlumber,
    HVAC: isoHvac,
    Electrician: isoElectrician,
    'Lawn Care': isoLawnCare,
    Handyman: isoHandyman,
    Roofing: isoRoofing,
    'Pest Control': isoPestControl,
  },
};

interface ServiceIcon3DProps {
  name: ServiceIconName;
  style: IconStyle;
  size?: number;
  className?: string;
}

export function ServiceIcon3D({ name, style, size = 48, className }: ServiceIcon3DProps) {
  const styleMap = iconAssets[style];
  if (!styleMap) return null;

  const src = styleMap[name];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
      draggable={false}
    />
  );
}
