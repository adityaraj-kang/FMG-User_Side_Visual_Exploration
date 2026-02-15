export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export type ServiceIconName =
  | 'Towing'
  | 'Plumber'
  | 'HVAC'
  | 'Electrician'
  | 'Lawn Care'
  | 'Handyman'
  | 'Roofing'
  | 'Pest Control';

export type NavIconName = 'home' | 'services' | 'activity' | 'profile';

export type UtilityIconName =
  | 'bell'
  | 'sparkles'
  | 'messageCircle'
  | 'search'
  | 'arrowUp'
  | 'mic'
  | 'chevronRight'
  | 'check';

export type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
