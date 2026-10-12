"use client";

import * as React from "react";

import { Icon } from "@/components/auth/icon";
import { cn } from "@/lib/utils";

// Rebuilt from the original site's shared password input (chunk 2175, module 7059).
type PasswordFieldProps = React.ComponentProps<"input"> & {
  className?: string;
};

export function PasswordField({ className, disabled, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        disabled={disabled}
        className={cn(className, "pr-10")}
      />
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-500 transition hover:text-gray-800 disabled:pointer-events-none disabled:opacity-50"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <Icon icon={visible ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="h-5 w-5" />
      </button>
    </div>
  );
}

export default PasswordField;
