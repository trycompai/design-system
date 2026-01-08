import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '@trycompai/design-system';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<Badge data-testid="badge">Label</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-slot', 'badge');
  });

  describe('variants', () => {
    it('applies default variant classes', () => {
      render(<Badge data-testid="badge">Default</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-primary');
    });

    it('applies secondary variant classes', () => {
      render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-secondary');
    });

    it('applies destructive variant classes', () => {
      render(<Badge variant="destructive" data-testid="badge">Error</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-destructive/10');
    });

    it('applies outline variant classes', () => {
      render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('border-border');
    });

    it('applies ghost variant classes', () => {
      render(<Badge variant="ghost" data-testid="badge">Ghost</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('bg-transparent');
    });

    it('applies link variant classes', () => {
      render(<Badge variant="link" data-testid="badge">Link</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('text-primary');
    });
  });

  it('renders as span by default', () => {
    render(<Badge data-testid="badge">Status</Badge>);
    expect(screen.getByTestId('badge').tagName).toBe('SPAN');
  });

  it('can render as anchor via render prop', () => {
    render(
      <Badge render={<a href="#" />} data-testid="badge">
        Link Badge
      </Badge>
    );
    expect(screen.getByTestId('badge').tagName).toBe('A');
  });
});
