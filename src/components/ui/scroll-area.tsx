import * as React from "react"
import * as RadixScrollArea from "@radix-ui/react-scroll-area"

import { cn } from "../../lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <RadixScrollArea.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <RadixScrollArea.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar
      orientation="vertical"
      className="flex touch-none select-none p-0.5 transition-colors duration-160 ease-out hover:bg-border/20 w-2.5 bg-transparent"
    >
      <RadixScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Scrollbar
      orientation="horizontal"
      className="flex touch-none select-none p-0.5 transition-colors duration-160 ease-out hover:bg-border/20 h-2.5 bg-transparent"
    >
      <RadixScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Corner className="bg-border" />
  </RadixScrollArea.Root>
))
ScrollArea.displayName = RadixScrollArea.Root.displayName

export { ScrollArea } 
