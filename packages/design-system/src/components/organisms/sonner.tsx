import {
  CheckmarkFilled,
  Information,
  Misuse,
  Renew,
  Warning,
} from '@carbon/icons-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ theme = 'system', ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckmarkFilled className="size-4 text-success" />,
        info: <Information className="size-4 text-info" />,
        warning: <Warning className="size-4 text-warning" />,
        error: <Misuse className="size-4 text-destructive" />,
        loading: <Renew className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
          description: '!text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
