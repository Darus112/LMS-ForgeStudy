"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    // Generăm iconițe „Plus” pe toată lungimea
    const renderPlusIcons = () => {
      const numIcons = 5; // Poți ajusta numărul de iconițe pe care vrei să le afișezi
      const icons = [];
      for (let i = 0; i < numIcons; i++) {
        icons.push(<Plus key={i} className="mx-1" />);
      }
      return icons;
    };

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0",
          orientation === "horizontal"
            ? " w-full flex justify-center items-center gap-[65px] md:gap-[150px]"
            : "h-full w-[1px]",
          className
        )}
        {...props}
      >
        {orientation === "horizontal" && renderPlusIcons()}
      </SeparatorPrimitive.Root>
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
