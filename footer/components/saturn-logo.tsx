export function SaturnLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      {/* Brutalist geometric Saturn */}
      {/* Planet circle */}
      <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" fill="none" />
      
      {/* Ring - top */}
      <path
        d="M 8 16 Q 16 10 24 16"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Ring - bottom */}
      <path
        d="M 8 16 Q 16 22 24 16"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* Center dot */}
      <rect x="15" y="15" width="2" height="2" fill="white" />
    </svg>
  )
}
