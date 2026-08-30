export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="var(--sky)" strokeWidth="2.5" />
      <path
        d="M16 2 A14 14 0 0 1 28.5 20"
        stroke="var(--amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="3" fill="var(--sky)" />
    </svg>
  );
}
