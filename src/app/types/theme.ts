export interface ActivityDeal {
  vendorName: string;
  price?: string;
  eta?: string;
  label: 'cheapest' | 'fastest';
}

export interface ActivityItemData {
  id: string;
  serviceType: string;
  status: 'in-progress' | 'served';
  vendorCount?: number;
  statusText?: string;
  deals?: [ActivityDeal, ActivityDeal];
  completedAt?: string;
}

export interface ThemeTokens {
  id: string;
  name: string;
  label: string;
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    surfaceElevated: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    accent: string;
    accentSoft: string;
    border: string;
    divider: string;
    navActive: string;
    navInactive: string;
    cardBg: string;
    iconBg: string;
    statusBar: string;
    ctaGreen?: string;
    statusActive?: string;
    statusServed?: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyHeading?: string;
    headingSize: string;
    sectionSize: string;
    bodySize: string;
    captionSize: string;
    headingWeight: number;
    sectionWeight: number;
    bodyWeight: number;
    letterSpacing: string;
  };
  spacing: {
    screenPadding: string;
    sectionGap: string;
    gridGap: string;
    cardPadding: string;
    borderRadius: string;
    borderRadiusLg: string;
    iconSize: string;
    iconContainerSize: string;
  };
  iconColors?: Record<string, string>;
  iconStyle?: {
    strokeWidth: number;
    activeStrokeWidth: number;
    fillActive: boolean;
  };
  chatInput?: {
    placeholder: string;
    icon: 'sparkles' | 'messageCircle' | 'search';
    trailingIcon: 'mic' | 'arrowUp' | 'none';
    heightOverride?: string;
  };
  effects?: {
    cardShadow?: string;
    glass?: boolean;
    glassBlur?: string;
    glassBorder?: string;
    glassBg?: string;
  };
}
