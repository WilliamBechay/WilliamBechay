import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea className={cn("field", className)} style={{ minHeight: 120 }} ref={ref} {...props} />
))
Textarea.displayName = "Textarea"

export { Textarea }
