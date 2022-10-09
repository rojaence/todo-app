export default function DotIcon({ size = 48 }) {
  return (
    <svg
      className="icon"
      style={{ stroke: "var(--primary-text-color)" }}
      viewBox="0 0 50 50"
    >
      <path
        d="M25 25 25 25"
        strokeLinecap="round"
        strokeWidth={size}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
