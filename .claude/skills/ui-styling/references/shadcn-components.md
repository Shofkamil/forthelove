# shadcn/ui Component Catalog

shadcn/ui is **not a dependency** — the CLI copies component source into your
repo (default `components/ui/`), so you own and can edit every component. Built
on Radix UI primitives + Tailwind, TypeScript-first.

## Install / add

```bash
npx shadcn@latest init          # one-time setup (paths, theme, CSS vars)
npx shadcn@latest add button    # add a component
npx shadcn@latest add button card dialog form   # add several
npx shadcn@latest add           # interactive picker
```

Components land in `@/components/ui/*` and pull their own Radix deps. Import via
the alias configured in `components.json` (default `@/components/ui/...`).

---

## Form & input

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings"><Settings /></Button>
<Button disabled>Disabled</Button>

// Render as another element (e.g. a Next.js Link) without losing styles:
import Link from "next/link"
<Button asChild><Link href="/pricing">Pricing</Link></Button>
```

### Input + Label
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Textarea, Checkbox, Switch, RadioGroup, Slider
```tsx
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<Textarea placeholder="Message" />

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

<div className="flex items-center gap-2">
  <Switch id="airplane" />
  <Label htmlFor="airplane">Airplane mode</Label>
</div>

<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r1" />
    <Label htmlFor="r1">Comfortable</Label>
  </div>
</RadioGroup>
```

### Select
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
```

### Date Picker (Popover + Calendar)
```tsx
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

const [date, setDate] = React.useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
  </PopoverContent>
</Popover>
```

### Form (react-hook-form + zod)
The `form` component wires RHF + Radix labels + accessible error messaging.
```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({ username: z.string().min(2, "Too short") })

export function ProfileForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => console.log(v))} className="space-y-6">
        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormDescription>Public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```

---

## Layout & navigation

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy in one click.</CardDescription>
  </CardHeader>
  <CardContent>{/* body */}</CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>
```

### Accordion
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Overlays & dialogs

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild><Button variant="outline">Edit</Button></DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes, then save.</DialogDescription>
    </DialogHeader>
    {/* form fields */}
    <DialogFooter><Button type="submit">Save</Button></DialogFooter>
  </DialogContent>
</Dialog>
```
Focus is trapped, `Esc` closes, the trigger is restored on close, and
title/description are wired to `aria-labelledby`/`aria-describedby` for you.

### Drawer (mobile sheet, Vaul)
```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
```
Use a responsive pattern: `Drawer` on small screens, `Dialog` on `md+`.

### Popover & Tooltip
```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline" size="icon"><Info /></Button></TooltipTrigger>
    <TooltipContent>More info</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Toast (Sonner — current default)
```tsx
// app root:
import { Toaster } from "@/components/ui/sonner"
<Toaster />

// anywhere:
import { toast } from "sonner"
toast.success("Saved")
toast.error("Something went wrong", { description: "Try again." })
```

### Command (⌘K palette)
```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```
Wrap in `CommandDialog` for a modal ⌘K launcher.

---

## Feedback & status

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session expired.</AlertDescription>
</Alert>

<Progress value={66} />

<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

---

## Display

### Badge & Avatar
```tsx
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="outline">v2</Badge>

<Avatar>
  <AvatarImage src="/me.png" alt="Jane Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow><TableHead>Invoice</TableHead><TableHead>Amount</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>INV001</TableCell><TableCell>$250.00</TableCell></TableRow>
  </TableBody>
</Table>
```

### Data Table (TanStack Table)
For sorting/filtering/pagination, compose the `Table` primitives with
`@tanstack/react-table`. Pattern: define `columns`, build the table with
`useReactTable({ data, columns, getCoreRowModel, getSortedRowModel,
getFilteredRowModel, getPaginationRowModel })`, then render header groups and
rows. See https://ui.shadcn.com/docs/components/data-table for the full recipe.

---

## Composition tips

- Prefer **composition over props**: build complex UI from the small primitives
  rather than one mega-component with dozens of flags.
- Use `asChild` to merge a component's behavior/styles onto your own element
  (links, custom triggers) without an extra wrapper node.
- Edit the generated files directly — they are yours. Re-running `add` will
  overwrite, so keep meaningful edits in mind when updating.
- Merge incoming `className` with the `cn()` helper (`lib/utils.ts`) so callers
  can override styles predictably.
