import { forwardRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SuggestionsGrid } from '../components/SuggestionsGrid';
import { RecentActivity } from '../components/RecentActivity';
import { BottomNav } from '../components/BottomNav';
import { MobileFrame } from '../components/MobileFrame';

export const HomeScreen = forwardRef<HTMLDivElement>(function HomeScreen(_props, ref) {
  const { theme } = useTheme();
  const s = theme.spacing;

  return (
    <MobileFrame ref={ref}>
      {/* Scrollable Content */}
      <div
        className="flex flex-col"
        style={{ paddingBottom: '12px' }}
      >
        <Header />

        <div style={{ height: s.sectionGap }} />

        <div>
          <SuggestionsGrid />
        </div>

        <div style={{ height: s.sectionGap }} />

        <RecentActivity />

        <div style={{ height: '8px' }} />

        {/* Chat input at bottom for all themes */}
        <SearchBar />

        <div style={{ height: '12px' }} />
      </div>

      {/* Fixed Bottom Nav */}
      <BottomNav />
    </MobileFrame>
  );
});
