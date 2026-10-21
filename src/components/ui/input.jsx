import * as React from "react"

import { cn } from "@/lib/utils"

// La mise en forme vient de .field (src/index.css) : hauteur, rayon,
// surface, anneau de focus et la taille de 16px sur pointeur grossier,
// qui est le seuil sous lequel Safari iOS zoome la page a la mise au
// point du champ. Ecrite en utilitaires ici, cette regle se perdait a
// la premiere passe mecanique sur les tailles de police.
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("field", className)} ref={ref} {...props} />
))
Input.displayName = "Input"

export { Input }
