"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// The original site vendored Radix's Checkbox (chunks 2678/2175, modules 38162/73457).
// `@radix-ui/react-checkbox` is not part of this project's dependencies, so the exact
// rendered DOM (checkbox button + hidden bubble input) and classes are ported directly.
type CheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  className?: string;
};

export function Checkbox({
  id,
  name,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  required,
  value = "on",
  className,
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const state = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !state;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <>
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={state}
        aria-required={required}
        data-state={state ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        value={value}
        onClick={toggle}
        className={cn(
          "peer border-input dark:bg-input/30 dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:text-[var(--color-white)]",
          className
        )}
      >
        <span
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
          style={{ pointerEvents: "none" }}
        >
          {state ? (
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : null}
        </span>
      </button>
      {name ? (
        <input
          type="checkbox"
          aria-hidden
          name={name}
          value={value}
          checked={state}
          required={required}
          disabled={disabled}
          readOnly
          tabIndex={-1}
          style={{
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            transform: "translateX(-100%)",
          }}
        />
      ) : null}
    </>
  );
}

export default Checkbox;
