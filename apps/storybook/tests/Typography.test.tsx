import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading, Text } from '@trycompai/design-system';

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading>Hello World</Heading>);
    expect(screen.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<Heading data-testid="heading">Title</Heading>);
    expect(screen.getByTestId('heading')).toHaveAttribute('data-slot', 'heading');
  });

  describe('levels', () => {
    it('renders as h1 by default', () => {
      render(<Heading data-testid="heading">H1</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H1');
    });

    it('renders as h2 when level="2"', () => {
      render(<Heading level="2" data-testid="heading">H2</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H2');
    });

    it('renders as h3 when level="3"', () => {
      render(<Heading level="3" data-testid="heading">H3</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H3');
    });

    it('renders as h4 when level="4"', () => {
      render(<Heading level="4" data-testid="heading">H4</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H4');
    });

    it('renders as h5 when level="5"', () => {
      render(<Heading level="5" data-testid="heading">H5</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H5');
    });

    it('renders as h6 when level="6"', () => {
      render(<Heading level="6" data-testid="heading">H6</Heading>);
      expect(screen.getByTestId('heading').tagName).toBe('H6');
    });
  });

  it('allows overriding element with as prop', () => {
    render(<Heading level="1" as="h3" data-testid="heading">Override</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H3');
  });

  describe('variants', () => {
    it('applies default variant', () => {
      render(<Heading data-testid="heading">Default</Heading>);
      expect(screen.getByTestId('heading')).toHaveClass('text-foreground');
    });

    it('applies muted variant', () => {
      render(<Heading variant="muted" data-testid="heading">Muted</Heading>);
      expect(screen.getByTestId('heading')).toHaveClass('text-muted-foreground');
    });
  });

  it('applies tracking variant', () => {
    render(<Heading tracking="tight" data-testid="heading">Tight</Heading>);
    expect(screen.getByTestId('heading')).toHaveClass('tracking-tight');
  });
});

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<Text data-testid="text">Content</Text>);
    expect(screen.getByTestId('text')).toHaveAttribute('data-slot', 'text');
  });

  it('renders as p by default', () => {
    render(<Text data-testid="text">Paragraph</Text>);
    expect(screen.getByTestId('text').tagName).toBe('P');
  });

  it('renders as span when as="span"', () => {
    render(<Text as="span" data-testid="text">Span</Text>);
    expect(screen.getByTestId('text').tagName).toBe('SPAN');
  });

  it('renders as div when as="div"', () => {
    render(<Text as="div" data-testid="text">Div</Text>);
    expect(screen.getByTestId('text').tagName).toBe('DIV');
  });

  describe('size variants', () => {
    it('applies xs size', () => {
      render(<Text size="xs" data-testid="text">XS</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-xs');
    });

    it('applies sm size', () => {
      render(<Text size="sm" data-testid="text">SM</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-sm');
    });

    it('applies base size by default', () => {
      render(<Text data-testid="text">Base</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-base');
    });

    it('applies lg size', () => {
      render(<Text size="lg" data-testid="text">LG</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-lg');
    });
  });

  describe('color variants', () => {
    it('applies default variant', () => {
      render(<Text data-testid="text">Default</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-foreground');
    });

    it('applies muted variant', () => {
      render(<Text variant="muted" data-testid="text">Muted</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-muted-foreground');
    });

    it('applies primary variant', () => {
      render(<Text variant="primary" data-testid="text">Primary</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-primary');
    });

    it('applies destructive variant', () => {
      render(<Text variant="destructive" data-testid="text">Error</Text>);
      expect(screen.getByTestId('text')).toHaveClass('text-destructive');
    });
  });

  describe('weight variants', () => {
    it('applies normal weight by default', () => {
      render(<Text data-testid="text">Normal</Text>);
      expect(screen.getByTestId('text')).toHaveClass('font-normal');
    });

    it('applies medium weight', () => {
      render(<Text weight="medium" data-testid="text">Medium</Text>);
      expect(screen.getByTestId('text')).toHaveClass('font-medium');
    });

    it('applies semibold weight', () => {
      render(<Text weight="semibold" data-testid="text">Semibold</Text>);
      expect(screen.getByTestId('text')).toHaveClass('font-semibold');
    });
  });

  it('applies font variant', () => {
    render(<Text font="mono" data-testid="text">Monospace</Text>);
    expect(screen.getByTestId('text')).toHaveClass('font-mono');
  });

  it('applies leading variant', () => {
    render(<Text leading="relaxed" data-testid="text">Relaxed</Text>);
    expect(screen.getByTestId('text')).toHaveClass('leading-relaxed');
  });
});
