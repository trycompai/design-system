"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Close } from "@carbon/icons-react";
import { Button } from "../atoms/button";

const dialogContentVariants = cva(
  "bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 text-sm ring-1 duration-100 fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none overflow-hidden",
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
      },
      padding: {
        none: "p-0 [--dialog-px:0px]",
        default: "p-4 [--dialog-px:--spacing(4)]",
        lg: "p-6 [--dialog-px:--spacing(6)]",
        xl: "p-8 [--dialog-px:--spacing(8)]",
      },
      radius: {
        md: "rounded-md [--dialog-radius:--spacing(1.5)]",
        lg: "rounded-lg [--dialog-radius:--spacing(2)]",
        xl: "rounded-xl [--dialog-radius:--spacing(3)]",
        "2xl": "rounded-2xl [--dialog-radius:--spacing(4)]",
        "3xl": "rounded-3xl [--dialog-radius:--spacing(6)]",
      },
    },
    defaultVariants: {
      size: "sm",
      padding: "default",
      radius: "xl",
    },
  },
);

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  ...props
}: Omit<DialogPrimitive.Backdrop.Props, "className">) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50"
      {...props}
    />
  );
}

function DialogContent({
  children,
  showCloseButton = true,
  size,
  padding,
  radius,
  ...props
}: Omit<DialogPrimitive.Popup.Props, "className"> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
  }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={dialogContentVariants({ size, padding, radius })}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" size="icon-sm" />}
            className="absolute top-2 right-2"
          >
            <Close />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({
  ...props
}: Omit<React.ComponentProps<"div">, "className">) {
  return (
    <div data-slot="dialog-header" className="gap-2 flex flex-col" {...props} />
  );
}

function DialogFooter({
  showCloseButton = false,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className="bg-muted border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:items-center [margin-inline:calc(var(--dialog-px,--spacing(4))*-1)] last:[border-bottom-left-radius:var(--dialog-radius,--spacing(3))] last:[border-bottom-right-radius:var(--dialog-radius,--spacing(3))] last:[margin-bottom:calc(var(--dialog-px,--spacing(4))*-1)]"
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({
  ...props
}: Omit<DialogPrimitive.Title.Props, "className">) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className="text-sm leading-none font-medium"
      {...props}
    />
  );
}

function DialogDescription({
  ...props
}: Omit<DialogPrimitive.Description.Props, "className">) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className="text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3"
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
