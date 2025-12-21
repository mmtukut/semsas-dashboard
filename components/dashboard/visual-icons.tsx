"use client"

// Large, expressive icons for the dashboard sections

export function AmbulanceIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Ambulance body */}
      <rect x="10" y="25" width="85" height="40" rx="4" fill="#0052A5" />
      <rect x="65" y="10" width="30" height="55" rx="4" fill="#0052A5" />

      {/* Windows */}
      <rect x="70" y="15" width="20" height="15" rx="2" fill="#87CEEB" />
      <rect x="15" y="30" width="15" height="12" rx="2" fill="#87CEEB" />

      {/* Red cross */}
      <rect x="30" y="35" width="20" height="6" rx="1" fill="#DC143C" />
      <rect x="37" y="28" width="6" height="20" rx="1" fill="#DC143C" />

      {/* Wheels */}
      <circle cx="30" cy="65" r="10" fill="#333" />
      <circle cx="30" cy="65" r="5" fill="#666" />
      <circle cx="75" cy="65" r="10" fill="#333" />
      <circle cx="75" cy="65" r="5" fill="#666" />

      {/* Lights */}
      <rect x="75" y="5" width="10" height="5" rx="2" fill="#DC143C" />
      <rect x="15" y="20" width="8" height="5" rx="1" fill="#FFB81C" />
    </svg>
  )
}

export function MedicalTeamIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Doctor */}
      <circle cx="35" cy="25" r="12" fill="#0052A5" />
      <path d="M35 37 C20 37 15 50 15 60 L55 60 C55 50 50 37 35 37" fill="#0052A5" />
      <circle cx="35" cy="22" r="6" fill="#FFE4C4" />
      {/* Stethoscope */}
      <path d="M30 30 Q25 40 30 45" stroke="#00A86B" strokeWidth="2" fill="none" />
      <circle cx="30" cy="46" r="3" fill="#00A86B" />

      {/* Nurse */}
      <circle cx="60" cy="28" r="10" fill="#00A86B" />
      <path d="M60 38 C48 38 44 48 44 56 L76 56 C76 48 72 38 60 38" fill="#00A86B" />
      <circle cx="60" cy="26" r="5" fill="#FFE4C4" />
      {/* Cap */}
      <rect x="55" y="18" width="10" height="3" fill="white" />
      <rect x="58" y="15" width="4" height="6" fill="#DC143C" />

      {/* EMT */}
      <circle cx="85" cy="25" r="12" fill="#FFB81C" />
      <path d="M85 37 C70 37 65 50 65 60 L105 60 C105 50 100 37 85 37" fill="#FFB81C" />
      <circle cx="85" cy="22" r="6" fill="#FFE4C4" />
      {/* Badge */}
      <rect x="80" y="42" width="10" height="8" rx="1" fill="white" />
      <rect x="83" y="44" width="4" height="1" fill="#DC143C" />
      <rect x="84" y="46" width="2" height="3" fill="#DC143C" />
    </svg>
  )
}

export function HospitalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Main building */}
      <rect x="25" y="20" width="70" height="55" fill="#0052A5" />

      {/* Windows */}
      {[35, 55, 75].map((x) =>
        [28, 45, 62].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="10" height="8" fill="#87CEEB" rx="1" />),
      )}

      {/* Entrance */}
      <rect x="52" y="55" width="16" height="20" fill="#00A86B" />

      {/* Cross */}
      <rect x="55" y="5" width="10" height="15" fill="#DC143C" />
      <rect x="50" y="8" width="20" height="6" fill="#DC143C" />

      {/* Sign */}
      <rect x="15" y="30" width="8" height="8" rx="4" fill="#DC143C" />
      <text x="19" y="36" className="text-[6px] fill-white font-bold" textAnchor="middle">
        H
      </text>
    </svg>
  )
}

export function EmergencyCallIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Phone */}
      <rect x="35" y="10" width="50" height="60" rx="8" fill="#333" />
      <rect x="38" y="15" width="44" height="45" rx="4" fill="#87CEEB" />

      {/* 112 on screen */}
      <text x="60" y="42" className="text-xl font-bold fill-[#DC143C]" textAnchor="middle">
        112
      </text>

      {/* Call waves */}
      <path d="M90 25 Q100 30 90 40" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M95 20 Q110 30 95 45" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.4" />
      <path d="M100 15 Q120 30 100 50" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.2" />

      {/* Emergency indicator */}
      <circle cx="60" cy="62" r="4" fill="#DC143C" />
    </svg>
  )
}

export function HeartPulseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Heart */}
      <path d="M60 70 C20 40 20 15 45 15 C55 15 60 25 60 25 C60 25 65 15 75 15 C100 15 100 40 60 70" fill="#DC143C" />

      {/* Pulse line */}
      <path
        d="M10 45 L35 45 L42 30 L50 60 L58 35 L65 55 L72 40 L80 45 L110 45"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Trophy cup */}
      <path d="M40 10 L80 10 L75 45 Q60 55 45 45 L40 10" fill="#FFB81C" />

      {/* Handles */}
      <path d="M40 15 Q25 15 25 30 Q25 40 40 40" stroke="#FFB81C" strokeWidth="6" fill="none" />
      <path d="M80 15 Q95 15 95 30 Q95 40 80 40" stroke="#FFB81C" strokeWidth="6" fill="none" />

      {/* Base */}
      <rect x="50" y="50" width="20" height="10" fill="#0052A5" />
      <rect x="40" y="60" width="40" height="8" rx="2" fill="#0052A5" />

      {/* Star */}
      <polygon points="60,18 63,28 74,28 65,34 68,45 60,38 52,45 55,34 46,28 57,28" fill="white" />
    </svg>
  )
}

export function TrendUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Chart bars */}
      <rect x="15" y="50" width="15" height="25" fill="#0052A5" rx="2" />
      <rect x="35" y="40" width="15" height="35" fill="#0052A5" rx="2" />
      <rect x="55" y="30" width="15" height="45" fill="#0052A5" rx="2" />
      <rect x="75" y="20" width="15" height="55" fill="#00A86B" rx="2" />
      <rect x="95" y="10" width="15" height="65" fill="#00A86B" rx="2" />

      {/* Trend line */}
      <path d="M22 48 L42 38 L62 28 L82 18 L102 8" stroke="#DC143C" strokeWidth="3" strokeLinecap="round" />

      {/* Arrow */}
      <polygon points="105,5 115,12 108,14" fill="#DC143C" />
    </svg>
  )
}

export function PatientIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      {/* Bed */}
      <rect x="15" y="45" width="90" height="5" fill="#0052A5" />
      <rect x="15" y="50" width="5" height="20" fill="#0052A5" />
      <rect x="100" y="50" width="5" height="20" fill="#0052A5" />

      {/* Mattress */}
      <rect x="20" y="35" width="80" height="10" rx="3" fill="#87CEEB" />

      {/* Patient body */}
      <ellipse cx="60" cy="38" rx="30" ry="5" fill="#00A86B" />

      {/* Pillow */}
      <rect x="75" y="28" width="20" height="10" rx="3" fill="white" stroke="#ddd" />

      {/* Head */}
      <circle cx="85" cy="28" r="8" fill="#FFE4C4" />

      {/* IV stand */}
      <rect x="25" y="10" width="2" height="35" fill="#666" />
      <rect x="20" y="10" width="12" height="3" fill="#666" />
      <rect x="22" y="5" width="8" height="8" rx="2" fill="#DC143C" />
    </svg>
  )
}

export function BleedingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#DC143C" opacity="0.15" />
      <path d="M30 10 Q20 25 20 35 Q20 50 30 50 Q40 50 40 35 Q40 25 30 10" fill="#DC143C" />
      <circle cx="30" cy="35" r="4" fill="white" opacity="0.3" />
    </svg>
  )
}

export function PregnantIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#00A86B" opacity="0.15" />
      {/* Body */}
      <circle cx="30" cy="15" r="8" fill="#FFE4C4" />
      <path d="M30 23 C20 23 18 35 22 45 L38 45 C42 35 40 23 30 23" fill="#00A86B" />
      {/* Belly bump */}
      <ellipse cx="30" cy="38" rx="10" ry="8" fill="#00A86B" />
      <ellipse cx="30" cy="38" rx="6" ry="5" fill="#00A86B" stroke="white" strokeWidth="1" />
    </svg>
  )
}

export function ConvulsionIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#FFB81C" opacity="0.15" />
      {/* Lightning bolts */}
      <path d="M25 15 L20 30 L28 28 L22 45 L35 25 L27 27 L35 15 Z" fill="#FFB81C" />
      <path d="M38 20 L35 30 L40 29 L36 40" stroke="#FFB81C" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function TraumaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#0052A5" opacity="0.15" />
      {/* Bandage cross */}
      <rect x="22" y="12" width="16" height="36" rx="3" fill="#0052A5" />
      <rect x="12" y="22" width="36" height="16" rx="3" fill="#0052A5" />
      {/* Plus sign */}
      <rect x="27" y="20" width="6" height="20" fill="white" />
      <rect x="20" y="27" width="20" height="6" fill="white" />
    </svg>
  )
}
