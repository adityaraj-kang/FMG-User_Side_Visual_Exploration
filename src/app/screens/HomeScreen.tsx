import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SuggestionsGrid } from '../components/SuggestionsGrid';
import { RecentActivity } from '../components/RecentActivity';
import { BottomNav } from '../components/BottomNav';
import { MobileFrame } from '../components/MobileFrame';

export function HomeScreen() {
  const { theme } = useTheme();
  const s = theme.spacing;

  return (
    <MobileFrame>
      {/* Scrollable Content */}
      <div
        className="flex flex-col flex-1"
        style={{ paddingBottom: '16px' }}
      >
        <Header />

        <div style={{ height: s.sectionGap }} />

        <SuggestionsGrid />

        <div style={{ height: s.sectionGap }} />

        <RecentActivity />

        <div style={{ height: '16px' }} />

        {/* Chat input at bottom for all themes */}
        <SearchBar />

        <div style={{ height: '16px' }} />
      </div>

      {/* Fixed Bottom Nav */}
      <BottomNav />
    </MobileFrame>
  );
}
