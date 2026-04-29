"use client";

export function LogoSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={props.className}
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
        <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="10" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <circle cx="84.64101615137754" cy="30" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <circle cx="84.64101615137756" cy="70" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <circle cx="50" cy="90" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <circle cx="15.358983848622458" cy="70.00000000000001" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <circle cx="15.358983848622437" cy="30.000000000000025" r="4" fill="url(#outerGradient)" opacity="0.8" />
      <polygon points="50,24 72.5166604983954,37 72.51666049839541,63 50,76 27.4833395016046,63.00000000000001 27.483339501604586,37.000000000000014" fill="none" stroke="url(#middleGradient)" strokeWidth="2" />
      <polygon points="50,36 62.12435565298214,43 62.124355652982146,57 50,64 37.87564434701786,57.00000000000001 37.875644347017854,43.00000000000001" fill="url(#centerGradient)" />
    </svg>
  );
}
