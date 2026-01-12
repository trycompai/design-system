'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Close, MagicWand, Send } from '@carbon/icons-react';
import * as React from 'react';

const aiChatTriggerVariants = cva(
  'fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer',
  {
    variants: {
      size: {
        default: 'size-14',
        sm: 'size-12',
        lg: 'size-16',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95',
        secondary: 'bg-foreground text-background hover:bg-foreground/90 active:scale-95',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

const aiChatPanelVariants = cva(
  'fixed bottom-24 right-6 z-50 flex flex-col bg-background border border-border rounded-2xl overflow-hidden transition-all duration-200 origin-bottom-right',
  {
    variants: {
      size: {
        default: 'w-96 h-[500px]',
        sm: 'w-80 h-[400px]',
        lg: 'w-[450px] h-[600px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface AIChatProps extends VariantProps<typeof aiChatTriggerVariants> {
  /** Whether the chat panel is open */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom trigger icon */
  triggerIcon?: React.ReactNode;
  /** Panel size */
  panelSize?: 'sm' | 'default' | 'lg';
  /** Content to render inside the chat panel */
  children?: React.ReactNode;
}

function AIChat({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  triggerIcon,
  size = 'default',
  variant = 'default',
  panelSize = 'default',
  children,
}: AIChatProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = openProp ?? internalOpen;

  const handleToggle = () => {
    const newValue = !isOpen;
    if (openProp === undefined) {
      setInternalOpen(newValue);
    }
    onOpenChange?.(newValue);
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        data-slot="ai-chat-panel"
        className={`${aiChatPanelVariants({ size: panelSize })} ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{
          boxShadow: '0 8px 32px -4px rgb(0 0 0 / 0.12), 0 4px 16px -2px rgb(0 0 0 / 0.08)',
        }}
      >
        {children || <AIChatDefaultContent onClose={handleToggle} />}
      </div>

      {/* Floating Trigger Button */}
      <button
        type="button"
        data-slot="ai-chat-trigger"
        onClick={handleToggle}
        className={aiChatTriggerVariants({ size, variant })}
        style={{
          boxShadow: '0 4px 16px -2px rgb(0 0 0 / 0.15), 0 2px 8px -2px rgb(0 0 0 / 0.1)',
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <span
          className={`absolute transition-all duration-200 ${
            isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
          }`}
        >
          {triggerIcon || <MagicWand className="size-6" />}
        </span>
        <span
          className={`absolute transition-all duration-200 ${
            isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
          }`}
        >
          <Close className="size-6" />
        </span>
      </button>
    </>
  );
}

// Default content when no children provided
function AIChatDefaultContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MagicWand className="size-4" />
          </span>
          <div>
            <div className="font-semibold text-sm">AI Assistant</div>
            <div className="text-xs text-muted-foreground">Ask me anything</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-8 flex items-center justify-center rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Close className="size-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-4">
          {/* AI Welcome Message */}
          <div className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MagicWand className="size-3.5" />
            </span>
            <div className="flex-1 rounded-2xl rounded-tl-sm bg-muted/50 dark:bg-muted px-3 py-2 text-sm">
              Hi! I'm your AI assistant. How can I help you today?
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 dark:bg-muted px-3 py-2">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send className="size-4" />
          </button>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Powered by AI
        </div>
      </div>
    </>
  );
}

// Compound components for custom content
function AIChatHeader({ children, ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="ai-chat-header"
      className="flex items-center justify-between px-4 py-3 border-b border-border"
      {...props}
    >
      {children}
    </div>
  );
}

function AIChatBody({ children, ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="ai-chat-body" className="flex-1 overflow-auto p-4" {...props}>
      {children}
    </div>
  );
}

function AIChatFooter({ children, ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="ai-chat-footer" className="p-3 border-t border-border" {...props}>
      {children}
    </div>
  );
}

export { AIChat, AIChatHeader, AIChatBody, AIChatFooter, aiChatTriggerVariants, aiChatPanelVariants };
export type { AIChatProps };
