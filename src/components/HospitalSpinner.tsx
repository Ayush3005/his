"use client";

interface HospitalSpinnerProps {
  size?: number;
  primary?: string;
  secondary?: string;
}

export default function HospitalSpinner({
  size = 80,
  primary = "text-sky-600",
  secondary = "text-sky-300",
}: HospitalSpinnerProps) {
  return (
    <div
      className="relative flex items-center justify-center animate-pulse-ring"
      style={{ width: size, height: size }}
    >
      {/* Spinning ring */}
      <div
        className={`absolute inset-0 border-4 rounded-full border-t-transparent border-r-transparent ${secondary} animate-spin`}
        style={{ borderColor: "rgba(56, 189, 248, 0.3)" }}
      ></div>

      {/* Static hospital cross */}
      <div
        className={`relative w-1/2 h-1/2 flex items-center justify-center ${primary} animate-pulse`}
      >
        {/* Vertical bar */}
        <div className="absolute w-1/4 h-full bg-current rounded-sm"></div>
        {/* Horizontal bar */}
        <div className="absolute h-1/4 w-full bg-current rounded-sm"></div>
      </div>
    </div>
  );
}
