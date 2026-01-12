'use client';

import { Close, MagicWand, Send, Keyboard } from '@carbon/icons-react';
import * as React from 'react';

import { Kbd } from '../atoms/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface AIChatProps {
  /** Whether the chat panel is open */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Content to render inside the chat panel */
  children?: React.ReactNode;
  /** Keyboard shortcut to toggle (default: Cmd+J) */
  shortcut?: string;
}

function AIChat({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  shortcut = 'j',
}: AIChatProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = openProp ?? internalOpen;

  const handleToggle = React.useCallback(() => {
    const newValue = !isOpen;
    if (openProp === undefined) {
      setInternalOpen(newValue);
    }
    onOpenChange?.(newValue);
  }, [isOpen, openProp, onOpenChange]);

  const handleClose = React.useCallback(() => {
    if (openProp === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [openProp, onOpenChange]);

  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === shortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleToggle();
      }
      // Close on Escape when open
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, handleToggle, handleClose, isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        data-slot="ai-chat-backdrop"
        className={`fixed inset-0 z-20 bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      {/* Chat Panel - floating module */}
      <div
        data-slot="ai-chat-panel"
        className={`fixed top-16 right-3 bottom-3 z-30 w-full max-w-md flex flex-col bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 ease-out ring-1 ring-black/[0.03] dark:ring-white/[0.05] ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-2 opacity-0 scale-[0.98] pointer-events-none'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 24px 48px -12px rgb(0 0 0 / 0.15), 0 12px 24px -8px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.03)'
            : 'none',
        }}
      >
        {children || <AIChatDefaultContent onClose={handleClose} />}
      </div>
    </>
  );
}

// Navbar trigger button for AI chat
interface AIChatTriggerProps {
  onClick?: () => void;
  isOpen?: boolean;
  shortcut?: string;
}

function AIChatTrigger({ onClick, isOpen, shortcut = 'J' }: AIChatTriggerProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 h-8 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              isOpen
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-accent text-foreground'
            }`}
            aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
          >
            <MagicWand className="size-4" />
            <span className="hidden sm:inline">Ask AI</span>
            <span className="hidden sm:inline-flex ml-1 opacity-60 text-xs bg-foreground/10 px-1.5 py-0.5 rounded">
              {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}
              {shortcut}
            </span>
          </button>
        }
      />
      <TooltipContent side="bottom">
        {isOpen ? 'Close AI Chat' : 'Open AI Chat'}
      </TooltipContent>
    </Tooltip>
  );
}

// Default content when no children provided
function AIChatDefaultContent({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when panel opens
  React.useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MagicWand className="size-5" />
          </span>
          <div>
            <div className="font-semibold text-sm">AI Assistant</div>
            <div className="text-xs text-muted-foreground">Ask me anything about your compliance</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Close className="size-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-4">
          {/* AI Welcome Message */}
          <div className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MagicWand className="size-4" />
            </span>
            <div className="flex-1 rounded-2xl rounded-tl-md bg-muted px-4 py-3 text-sm">
              <p className="mb-2">Hi! I can help you with:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Understanding compliance requirements</li>
                <li>Reviewing and creating policies</li>
                <li>Analyzing evidence and controls</li>
                <li>Answering questions about SOC 2, ISO 27001, and more</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                // Handle send
                setMessage('');
              }
            }}
          />
          <button
            type="button"
            disabled={!message.trim()}
            className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Keyboard className="size-3" />
          <span>Press <Kbd>Esc</Kbd> to close</span>
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
      className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0"
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
    <div data-slot="ai-chat-footer" className="p-4 border-t border-border shrink-0" {...props}>
      {children}
    </div>
  );
}

export { AIChat, AIChatBody, AIChatFooter, AIChatHeader, AIChatTrigger };
export type { AIChatProps, AIChatTriggerProps };
