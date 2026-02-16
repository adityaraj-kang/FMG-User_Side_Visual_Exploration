import type { ThemeTokens } from '../types/theme';

const DC_ICON_COLORS: Record<string, string> = {
  Towing: '#FF6A2B',
  Plumber: '#2E93FA',
  HVAC: '#00E096',
  Electrician: '#FFC043',
  'Lawn Care': '#34C759',
  Handyman: '#FF8C00',
  Roofing: '#A1A1A1',
  'Pest Control': '#FF2D55',
};

const dcBase: Omit<ThemeTokens, 'id' | 'name' | 'label' | 'iconColors'> = {
  mode: 'dark',
  colors: {
    background: '#000000',
    surface: '#141414',
    surfaceElevated: '#1F1F1F',
    textPrimary: '#FFFFFF',
    textSecondary: '#ABABAB',
    textTertiary: '#6B6B6B',
    accent: '#FFFFFF',
    accentSoft: 'rgba(255, 255, 255, 0.08)',
    border: '#2A2A2A',
    divider: '#2A2A2A',
    navActive: '#FFFFFF',
    navInactive: '#6B6B6B',
    cardBg: '#141414',
    iconBg: '#1F1F1F',
    statusBar: '#FFFFFF',
    ctaGreen: '#FF4D00',
    statusActive: '#FFFFFF',
    statusServed: '#FF4D00',
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    headingSize: '32px',
    sectionSize: '20px',
    bodySize: '14px',
    captionSize: '12px',
    headingWeight: 700,
    sectionWeight: 700,
    bodyWeight: 500,
    letterSpacing: '-0.02em',
  },
  spacing: {
    screenPadding: '16px',
    sectionGap: '20px',
    gridGap: '12px',
    cardPadding: '16px',
    borderRadius: '8px',
    borderRadiusLg: '8px',
    iconSize: '24px',
    iconContainerSize: '56px',
  },
  iconStyle: {
    strokeWidth: 2.2,
    activeStrokeWidth: 2.4,
    fillActive: false,
  },
  chatInput: {
    placeholder: 'Where do you need help?',
    icon: 'search',
    trailingIcon: 'arrowUp',
  },
  effects: {
    cardShadow: 'none',
  },
};

export const designersChoiceTheme: ThemeTokens = {
  ...dcBase,
  id: 'designers-choice',
  name: 'DC Light',
  label: 'DC Light',
  iconColors: {},
};

export const dcLineColorTheme: ThemeTokens = {
  ...dcBase,
  id: 'dc-line-color',
  name: 'DC Line Color',
  label: 'DC Color',
  iconColors: DC_ICON_COLORS,
};

export const dcFillColorTheme: ThemeTokens = {
  ...dcBase,
  id: 'dc-fill-color',
  name: 'DC Fill Color',
  label: 'DC Fill',
  iconColors: DC_ICON_COLORS,
};
