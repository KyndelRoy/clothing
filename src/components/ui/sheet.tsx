'use client'

import * as React from 'react'

import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='sheet' {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='sheet-close' {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='sheet-portal' {...props} />
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(
        'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
}

type SheetSide = 'top' | 'right' | 'bottom' | 'left'

const sheetSideClasses: Record<SheetSide, string> = {
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-open:slide-in-from-right data-closed:slide-out-to-right sm:max-w-md',
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-open:slide-in-from-left data-closed:slide-out-to-left sm:max-w-md',
  top: 'inset-x-0 top-0 h-auto max-h-[90vh] border-b data-open:slide-in-from-top data-closed:slide-out-to-top',
  bottom:
    'inset-x-0 bottom-0 h-auto max-h-[90vh] border-t data-open:slide-in-from-bottom data-closed:slide-out-to-bottom rounded-t-3xl'
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: SheetSide
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out',
          'data-open:animate-in data-closed:animate-out data-closed:duration-200 data-open:duration-300',
          sheetSideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot='sheet-close'
            className={cn(
              'ring-offset-background focus:ring-ring/30 absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-background text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none',
              'border-foreground/15 border'
            )}
            aria-label='Close'
          >
            <XIcon className='size-4' />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-header'
      className={cn('flex shrink-0 flex-col gap-1 p-4 text-left sm:p-6', className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='sheet-title'
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-body'
      className={cn('flex-1 overflow-y-auto px-4 pb-6 sm:px-6', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-footer'
      className={cn(
        'flex shrink-0 flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-6',
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter
}
