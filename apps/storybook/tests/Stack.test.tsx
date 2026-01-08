import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack, VStack, HStack } from '@trycompai/design-system';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('has data-slot attribute', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId('stack')).toHaveAttribute('data-slot', 'stack');
  });

  it('applies flex class by default', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex');
  });

  it('defaults to column direction', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex-col');
  });

  it('applies row direction when specified', () => {
    render(
      <Stack direction="row" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-row');
  });

  it('applies row-reverse direction', () => {
    render(
      <Stack direction="row-reverse" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-row-reverse');
  });

  it('applies column-reverse direction', () => {
    render(
      <Stack direction="column-reverse" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-col-reverse');
  });

  describe('gap variants', () => {
    it('applies gap-0 for none', () => {
      render(
        <Stack gap="none" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('gap-0');
    });

    it('applies gap-1 for xs', () => {
      render(
        <Stack gap="xs" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('gap-1');
    });

    it('applies gap-2 for sm', () => {
      render(
        <Stack gap="sm" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('gap-2');
    });

    it('applies gap-4 for md (default)', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveClass('gap-4');
    });

    it('applies gap-6 for lg', () => {
      render(
        <Stack gap="lg" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('gap-6');
    });

    it('applies gap-8 for xl', () => {
      render(
        <Stack gap="xl" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('gap-8');
    });
  });

  describe('align variants', () => {
    it('applies items-start for start', () => {
      render(
        <Stack align="start" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-start');
    });

    it('applies items-center for center', () => {
      render(
        <Stack align="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-center');
    });

    it('applies items-end for end', () => {
      render(
        <Stack align="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-end');
    });

    it('applies items-stretch for stretch (default)', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveClass('items-stretch');
    });

    it('applies items-baseline for baseline', () => {
      render(
        <Stack align="baseline" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-baseline');
    });
  });

  describe('justify variants', () => {
    it('applies justify-start for start (default)', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveClass('justify-start');
    });

    it('applies justify-center for center', () => {
      render(
        <Stack justify="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-center');
    });

    it('applies justify-end for end', () => {
      render(
        <Stack justify="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-end');
    });

    it('applies justify-between for between', () => {
      render(
        <Stack justify="between" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-between');
    });

    it('applies justify-around for around', () => {
      render(
        <Stack justify="around" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-around');
    });

    it('applies justify-evenly for evenly', () => {
      render(
        <Stack justify="evenly" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-evenly');
    });
  });

  describe('wrap variants', () => {
    it('applies flex-nowrap for nowrap (default)', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveClass('flex-nowrap');
    });

    it('applies flex-wrap for wrap', () => {
      render(
        <Stack wrap="wrap" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-wrap');
    });

    it('applies flex-wrap-reverse for wrap-reverse', () => {
      render(
        <Stack wrap="wrap-reverse" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-wrap-reverse');
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as div by default', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack').tagName).toBe('DIV');
    });

    it('renders as nav when specified', () => {
      render(
        <Stack as="nav" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack').tagName).toBe('NAV');
    });

    it('renders as section when specified', () => {
      render(
        <Stack as="section" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack').tagName).toBe('SECTION');
    });

    it('renders as ul when specified', () => {
      render(
        <Stack as="ul" data-testid="stack">
          <li>Item</li>
        </Stack>
      );
      expect(screen.getByTestId('stack').tagName).toBe('UL');
    });
  });
});

describe('VStack', () => {
  it('renders children', () => {
    render(
      <VStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </VStack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('defaults to column direction', () => {
    render(<VStack data-testid="vstack">Content</VStack>);
    expect(screen.getByTestId('vstack')).toHaveClass('flex-col');
  });

  it('applies gap variants', () => {
    render(
      <VStack gap="lg" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('gap-6');
  });

  it('applies align variants', () => {
    render(
      <VStack align="center" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('items-center');
  });

  it('applies justify variants', () => {
    render(
      <VStack justify="between" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('justify-between');
  });

  it('supports polymorphic as prop', () => {
    render(
      <VStack as="section" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack').tagName).toBe('SECTION');
  });
});

describe('HStack', () => {
  it('renders children', () => {
    render(
      <HStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </HStack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('defaults to row direction', () => {
    render(<HStack data-testid="hstack">Content</HStack>);
    expect(screen.getByTestId('hstack')).toHaveClass('flex-row');
  });

  it('applies gap variants', () => {
    render(
      <HStack gap="xl" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('gap-8');
  });

  it('applies align variants', () => {
    render(
      <HStack align="end" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('items-end');
  });

  it('applies justify variants', () => {
    render(
      <HStack justify="center" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('justify-center');
  });

  it('applies wrap variants', () => {
    render(
      <HStack wrap="wrap" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('flex-wrap');
  });

  it('supports polymorphic as prop', () => {
    render(
      <HStack as="nav" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack').tagName).toBe('NAV');
  });
});
