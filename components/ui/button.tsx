import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Rebuilt from the original site's shared Button (chunk 5105, module 3998).
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-medium font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-[var(--shadow-button)] hover:bg-[#b71b21]",
        accent:
          "border border-black bg-[var(--color-secondary)] text-black shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md",
        destructive: "bg-[#9b1217] text-white shadow-md hover:bg-[#7d0e12]",
        outline:
          "border border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
        secondary:
          "border border-black bg-[var(--color-secondary)] text-black hover:opacity-90",
        white:
          "hover:bg-[var(--color-secondary)] hover:text-black text-[var(--color-primary)] bg-white border border-transparent hover:border-black",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
        ghost: "bg-transparent text-gray-500 hover:bg-black/5 hover:text-gray-800",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-5 font-semibold has-[>svg]:px-4",
        cta: "h-auto rounded-xl px-8 py-3 text-base font-semibold has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
