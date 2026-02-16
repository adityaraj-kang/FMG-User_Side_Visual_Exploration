import { useTheme } from '../context/ThemeContext';
import { UtilityIcon } from './icons';

export function SearchBar() {
  const { theme } = useTheme();
  const t = theme.typography;
  const c = theme.colors;
  const s = theme.spacing;
  const chat = theme.chatInput;

  const id = theme.id;
  const isPremium = id === 'premium';
  const isUber = id === 'uber';
  const isApple = id === 'apple-ios';
  const isMaterial = id === 'material-you';
  const isUberVariation = id.startsWith('uber-');
  const isDesignersChoice = id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color';

  const placeholder = chat?.placeholder || 'Ask your Genie anything...';
  const leadingIcon = chat?.icon || 'sparkles';
  const trailingIcon = chat?.trailingIcon || 'none';
  const heightOverride = chat?.heightOverride;

  // CTA button color per variation
  const ctaColor = isUber || isUberVariation || isDesignersChoice
    ? (c.ctaGreen || c.accent)
    : c.accent;

  // CTA icon color (dark text on colored button)
  const ctaIconColor = isUber || isUberVariation || isPremium || isDesignersChoice
    ? '#000000'
    : '#FFFFFF';

  return (
    <div style={{ padding: `0 ${s.screenPadding}` }}>
      <div
        className="flex items-center"
        style={{
          height: heightOverride || (isApple ? '36px' : isPremium ? '48px' : '50px'),
          borderRadius:
            isMaterial
              ? '28px'
              : isApple
                ? '10px'
                : isPremium
                  ? '8px'
                  : s.borderRadius,
          background:
            isPremium
              ? c.surfaceElevated
              : isMaterial
                ? c.surface
                : isApple
                  ? 'rgba(118, 118, 128, 0.12)'
                  : c.surfaceElevated,
          border:
            id === 'claude' || isPremium
              ? `1px solid ${c.border}`
              : isDesignersChoice
                ? `1px solid ${c.border}`
                : 'none',
          padding:
            isApple
              ? '0 10px'
              : `0 ${s.cardPadding}`,
          gap: '10px',
        }}
      >
        {/* Leading icon */}
        <UtilityIcon
          name={leadingIcon}
          size={isApple ? 16 : 20}
          color={
            isPremium
              ? c.textTertiary
              : isApple
                ? '#8E8E93'
                : isMaterial
                  ? c.accent
                  : c.textTertiary
          }
        />

        {/* Placeholder text */}
        <span
          className="flex-1"
          style={{
            fontFamily: t.fontFamily,
            fontSize: isApple ? '17px' : t.bodySize,
            fontWeight: 400,
            color: c.textTertiary,
          }}
        >
          {placeholder}
        </span>

        {/* Trailing icon — mic */}
        {trailingIcon === 'mic' && (
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isUberVariation ? ctaColor : 'transparent',
            }}
          >
            <UtilityIcon
              name="mic"
              size={18}
              color={isUberVariation ? ctaIconColor : (isMaterial ? c.accent : c.textTertiary)}
            />
          </div>
        )}

        {/* Trailing icon — arrow up */}
        {trailingIcon === 'arrowUp' && (
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: ctaColor,
            }}
          >
            <UtilityIcon
              name="arrowUp"
              size={16}
              color={ctaIconColor}
            />
          </div>
        )}
      </div>
    </div>
  );
}
