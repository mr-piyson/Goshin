interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: {
    track: "h-4 w-7",
    thumb: "h-3 w-3",
    translate: "translate-x-3",
    text: "text-xs",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
    text: "text-sm",
  },
  lg: {
    track: "h-8 w-14",
    thumb: "h-7 w-7",
    translate: "translate-x-6",
    text: "text-base",
  },
};

export function Switch({ checked, onChange, label, disabled = false, size = "sm" }: SwitchProps) {
  const currentSize = sizeStyles[size];

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className={`relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${currentSize.track} ${checked ? "bg-accent" : "bg-gray-300 dark:bg-gray-700"}`}>
        <span className={`pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${currentSize.thumb} ${checked ? currentSize.translate : "translate-x-0"}`} />
      </button>
    </label>
  );
}
