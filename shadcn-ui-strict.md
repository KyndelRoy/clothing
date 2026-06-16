---
name: shadcn-ui-strict
description: 'Enforces strict adherence to official shadcn/ui components without modifications. Use official components exactly as documented on ui.shadcn.com'
triggers:
  - 'shadcn ui'
  - 'ui component'
  - 'button'
  - 'card'
  - 'input'
  - 'dialog'
  - 'form'
  - 'table'
  - 'create component'
  - 'add ui'
---

# shadcn/ui Strict Mode - NO MODIFICATIONS ALLOWED

## CRITICAL RULES

### 🚫 NEVER DO THESE:

1. **NEVER** create custom variants of shadcn/ui components
2. **NEVER** modify the core structure of shadcn components
3. **NEVER** add custom CSS classes that override shadcn defaults
4. **NEVER** create "enhanced" or "custom" versions of buttons, cards, inputs, etc.
5. **NEVER** change component props from the official API
6. **NEVER** wrap shadcn components in custom styled wrappers
7. **NEVER** modify Tailwind classes on shadcn components unless explicitly requested

### ✅ ALWAYS DO THESE:

1. **ALWAYS** use components exactly as documented on ui.shadcn.com [[5]][[6]]
2. **ALWAYS** import from `@/components/ui/` path
3. **ALWAYS** use the exact component API from official documentation
4. **ALWAYS** maintain the default styling and behavior
5. **ALWAYS** copy components using the official CLI or registry

## OFFICIAL COMPONENT IMPORTS

Use ONLY these import paths:

```typescript
// Core Components - Import exactly as shown
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

COMPONENT USAGE EXAMPLES
Button - Use EXACTLY like this:

// ✅ CORRECT - Official variants only
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// ❌ WRONG - Never do this
<Button className="bg-custom-blue hover:bg-custom-dark">Custom</Button>
<Button customProp="value">Modified</Button>

Card - Use EXACTLY like this:

// ✅ CORRECT - Official structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// ❌ WRONG - Never modify structure
<Card className="custom-shadow rounded-3xl">
  <div className="my-custom-header">Title</div>
</Card>

Input - Use EXACTLY like this:
// ✅ CORRECT - Official usage
<Input
  type="email"
  placeholder="Email"
  className="w-full" // Only layout classes allowed
/>

// ❌ WRONG - Never style inputs
<Input className="border-2 border-blue-500 rounded-full px-6" />

DESIGN SYSTEM SETTINGS
Based on the configuration shown, use these exact settings:
Style: Mira
Base Color: Zinc (gray scale)
Theme: Zinc
Font: Geist (for headings and body)
Icon Library: Lucide React
Radius: Small (rounded-md)

ICON USAGE
Always use Lucide React icons:

import { IconName } from "lucide-react"

// ✅ CORRECT
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>

LAYOUT CLASSES ONLY
You may ONLY add these types of classes:
Layout: w-full, h-full, flex, grid, flex-col, etc.
Spacing: m-4, p-4, gap-4, space-y-4, etc.
Positioning: relative, absolute, fixed, etc.
Responsive: md:, lg:, xl: prefixes

You may NEVER add these classes:
Colors: bg-blue-500, text-red-600, border-green-400
Effects: shadow-lg, ring-2, animate-pulse
Typography: font-bold, text-xl, leading-relaxed
Borders: rounded-full, border-2, rounded-3xl

WHEN USER ASKS FOR CUSTOMIZATION
If the user requests custom styling:
First confirm they want to deviate from shadcn defaults
Suggest using the official variant props instead
If they insist, clearly mark it as a deviation from shadcn standards

Example response:

Note: This customization deviates from official shadcn/ui design.
Consider using the official variant instead:
<Button variant="outline"> instead of custom className

FORM COMPONENTS
Always use shadcn form components with react-hook-form and zod:
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

// Use official Form components exactly as documented

CHART COMPONENTS
For charts, use official shadcn chart components:
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

ERROR HANDLING
If you're unsure about a component:
Check ui.shadcn.com/docs/components first
Use the CLI to add the component: npx shadcn@latest add component-name
Never guess or create your own implementation

COMPONENT ADDITION COMMAND
When a new component is needed, instruct user to run:

npx shadcn@latest add [component-name]

Official components available:
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip
REMINDER
Every time you generate UI code, ask yourself:
"Does this look EXACTLY like the examples on ui.shadcn.com?"
If the answer is no, revise it until it matches the official documentation exactly.
The goal is consistency with shadcn/ui design system, NOT creativity or customization.


---

## Usage Instructions:

1. **Save the file** in the appropriate location:
   - Qoder CLI: `.qoder/skills/shadcn-ui-strict.md`
   - OpenCode: `skills/shadcn-ui-strict.md`
   - Other tools: Check their skills/rules directory

2. **Activate the skill** by mentioning any trigger word:
   - "Create a shadcn ui button"
   - "Add a card component"
   - "Build a form with shadcn"

3. **The AI will now**:
   - Use only official shadcn/ui components
   - Import from correct paths (`@/components/ui/`)
   - Maintain exact design from ui.shadcn.com
   - Avoid custom styling and modifications

This skill enforces the strict design system you want, preventing "AI slop" and keeping your UI consistent with official shadcn/ui components [[10]][[15]][[17]].
```
