export const SystemPromptSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg"
  >
    <rect width="800" height="400" rx="8" fill="#1E1E2E" />
    <rect x="40" y="40" width="720" height="320" rx="8" fill="#2A2A3C" />

    {/* AI Brain */}
    <circle cx="400" cy="120" r="60" fill="#8B5CF6" fillOpacity="0.2" />
    <path d="M400 80 C430 100 430 140 400 160 C370 140 370 100 400 80" stroke="#8B5CF6" strokeWidth="3" fill="none" />
    <path
      d="M380 100 C390 110 390 130 380 140 M420 100 C410 110 410 130 420 140"
      stroke="#8B5CF6"
      strokeWidth="3"
      fill="none"
    />
    <circle cx="400" cy="120" r="5" fill="#8B5CF6" />

    {/* System Prompt */}
    <rect x="100" y="220" width="240" height="120" rx="4" fill="#1E1E2E" />
    <text x="120" y="250" fill="#8B5CF6" fontFamily="monospace" fontSize="14">
      <tspan x="120" y="250">
        You are an AI assistant
      </tspan>
      <tspan x="120" y="270">
        # Instructions
      </tspan>
      <tspan x="120" y="290">
        Be helpful and accurate
      </tspan>
      <tspan x="120" y="310">
        Follow user requests
      </tspan>
    </text>

    {/* Extraction Arrow */}
    <path d="M360 280 L440 280" stroke="#FF5555" strokeWidth="3" strokeDasharray="5 5" />
    <polygon points="440,280 430,275 430,285" fill="#FF5555" />

    {/* Extracted Content */}
    <rect x="460" y="220" width="240" height="120" rx="4" fill="#1E1E2E" />
    <text x="480" y="250" fill="#FF5555" fontFamily="monospace" fontSize="14">
      <tspan x="480" y="250">
        EXTRACTED:
      </tspan>
      <tspan x="480" y="270">
        You are an AI assistant
      </tspan>
      <tspan x="480" y="290">
        # Instructions
      </tspan>
      <tspan x="480" y="310">
        Be helpful and accurate...
      </tspan>
    </text>

    {/* Warning Icon */}
    <circle cx="680" cy="240" r="15" fill="#FF5555" fillOpacity="0.2" />
    <text x="676" y="245" fill="#FF5555" fontSize="20">
      !
    </text>
  </svg>
)

export const VulnerabilitiesSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg"
  >
    <rect width="800" height="400" rx="8" fill="#1E1E2E" />

    {/* Shield Background */}
    <path d="M400 60 L520 100 L520 200 C520 260 470 320 400 340 C330 320 280 260 280 200 L280 100 Z" fill="#2A2A3C" />
    <path
      d="M400 80 L500 110 L500 200 C500 250 460 300 400 320 C340 300 300 250 300 200 L300 110 Z"
      stroke="#8B5CF6"
      strokeWidth="2"
      fill="none"
    />

    {/* Vulnerability Points */}
    <circle cx="350" cy="150" r="15" fill="#FF5555" fillOpacity="0.3" />
    <text x="346" y="155" fill="#FF5555" fontSize="16">
      1
    </text>
    <text x="375" y="155" fill="#CCCCCC" fontSize="14">
      Prompt Injection
    </text>

    <circle cx="350" cy="200" r="15" fill="#FF5555" fillOpacity="0.3" />
    <text x="346" y="205" fill="#FF5555" fontSize="16">
      2
    </text>
    <text x="375" y="205" fill="#CCCCCC" fontSize="14">
      Verbose Errors
    </text>

    <circle cx="350" cy="250" r="15" fill="#FF5555" fillOpacity="0.3" />
    <text x="346" y="255" fill="#FF5555" fontSize="16">
      3
    </text>
    <text x="375" y="255" fill="#CCCCCC" fontSize="14">
      Inconsistent Enforcement
    </text>

    <circle cx="350" cy="300" r="15" fill="#FF5555" fillOpacity="0.3" />
    <text x="346" y="305" fill="#FF5555" fontSize="16">
      4
    </text>
    <text x="375" y="305" fill="#CCCCCC" fontSize="14">
      Token Completion
    </text>

    {/* Cracks in Shield */}
    <path d="M380 120 L420 160 M420 120 L380 160" stroke="#FF5555" strokeWidth="2" />
    <path d="M400 160 L400 280" stroke="#FF5555" strokeWidth="2" strokeDasharray="5 5" />
  </svg>
)

export const EthicsSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg"
  >
    <rect width="800" height="400" rx="8" fill="#1E1E2E" />

    {/* Balance Scale */}
    <line x1="400" y1="100" x2="400" y2="200" stroke="#8B5CF6" strokeWidth="3" />
    <line x1="300" y1="200" x2="500" y2="200" stroke="#8B5CF6" strokeWidth="3" />

    {/* Left Scale */}
    <line x1="300" y1="200" x2="350" y2="250" stroke="#8B5CF6" strokeWidth="2" />
    <circle cx="350" cy="250" r="30" fill="#2A2A3C" />
    <text x="335" y="255" fill="#CCCCCC" fontSize="14">
      Ethics
    </text>

    {/* Right Scale */}
    <line x1="500" y1="200" x2="450" y2="230" stroke="#8B5CF6" strokeWidth="2" />
    <circle cx="450" cy="230" r="30" fill="#2A2A3C" />
    <text x="425" y="235" fill="#CCCCCC" fontSize="14">
      Research
    </text>

    {/* Ethical Considerations */}
    <rect x="100" y="300" width="200" height="30" rx="4" fill="#2A2A3C" />
    <text x="120" y="320" fill="#CCCCCC" fontSize="14">
      Responsible Disclosure
    </text>

    <rect x="100" y="340" width="200" height="30" rx="4" fill="#2A2A3C" />
    <text x="120" y="360" fill="#CCCCCC" fontSize="14">
      Intellectual Property
    </text>

    {/* Research Benefits */}
    <rect x="500" y="300" width="200" height="30" rx="4" fill="#2A2A3C" />
    <text x="520" y="320" fill="#CCCCCC" fontSize="14">
      Security Improvements
    </text>

    <rect x="500" y="340" width="200" height="30" rx="4" fill="#2A2A3C" />
    <text x="520" y="360" fill="#CCCCCC" fontSize="14">
      Educational Value
    </text>

    {/* Question Mark */}
    <circle cx="400" cy="80" r="20" fill="#8B5CF6" fillOpacity="0.2" />
    <text x="395" y="85" fill="#8B5CF6" fontSize="20">
      ?
    </text>
  </svg>
)

export const ProtectionSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg"
  >
    <rect width="800" height="400" rx="8" fill="#1E1E2E" />

    {/* AI System */}
    <rect x="100" y="100" width="600" height="200" rx="8" fill="#2A2A3C" />

    {/* Protection Layers */}
    <rect
      x="120"
      y="120"
      width="560"
      height="160"
      rx="6"
      stroke="#8B5CF6"
      strokeWidth="2"
      strokeDasharray="5 5"
      fill="none"
    />
    <text x="130" y="145" fill="#8B5CF6" fontSize="14">
      Layer 1: Input Validation
    </text>

    <rect
      x="140"
      y="160"
      width="520"
      height="120"
      rx="6"
      stroke="#8B5CF6"
      strokeWidth="2"
      strokeDasharray="5 5"
      fill="none"
    />
    <text x="150" y="185" fill="#8B5CF6" fontSize="14">
      Layer 2: Instruction Architecture
    </text>

    <rect
      x="160"
      y="200"
      width="480"
      height="80"
      rx="6"
      stroke="#8B5CF6"
      strokeWidth="2"
      strokeDasharray="5 5"
      fill="none"
    />
    <text x="170" y="225" fill="#8B5CF6" fontSize="14">
      Layer 3: Response Filtering
    </text>

    {/* Core AI */}
    <rect x="200" y="240" width="400" height="40" rx="4" fill="#8B5CF6" fillOpacity="0.2" />
    <text x="350" y="265" fill="#8B5CF6" fontSize="14" textAnchor="middle">
      AI Core
    </text>

    {/* Attack Arrows */}
    <path d="M50 150 L100 150" stroke="#FF5555" strokeWidth="2" />
    <polygon points="100,150 90,145 90,155" fill="#FF5555" />
    <text x="60" y="140" fill="#FF5555" fontSize="12">
      Attack
    </text>

    <path d="M50 200 L100 200" stroke="#FF5555" strokeWidth="2" />
    <polygon points="100,200 90,195 90,205" fill="#FF5555" />
    <text x="60" y="190" fill="#FF5555" fontSize="12">
      Attack
    </text>

    <path d="M50 250 L100 250" stroke="#FF5555" strokeWidth="2" />
    <polygon points="100,250 90,245 90,255" fill="#FF5555" />
    <text x="60" y="240" fill="#FF5555" fontSize="12">
      Attack
    </text>

    {/* Shield Icon */}
    <path
      d="M700 200 L730 210 L730 240 C730 260 720 280 700 290 C680 280 670 260 670 240 L670 210 Z"
      fill="none"
      stroke="#8B5CF6"
      strokeWidth="2"
    />
    <text x="695" y="245" fill="#8B5CF6" fontSize="14">
      ✓
    </text>
  </svg>
)

