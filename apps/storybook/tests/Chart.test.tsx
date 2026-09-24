import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartContainer } from '@trycompai/design-system';
import { Area, AreaChart } from 'recharts';

// jsdom has no ResizeObserver, which recharts' ResponsiveContainer needs.
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

describe('ChartContainer', () => {
  it('renders a style block for a safe config', () => {
    const { container } = render(
      <ChartContainer
        id='revenue'
        config={{ revenue: { label: 'Revenue', color: '#22c55e' } }}
      >
        <AreaChart data={[{ value: 1 }]}>
          <Area dataKey='value' />
        </AreaChart>
      </ChartContainer>,
    );
    const style = container.querySelector('style');
    expect(style?.innerHTML).toContain('--color-revenue: #22c55e;');
  });

  it('drops config keys that could break out of the style element', () => {
    const { container } = render(
      <ChartContainer
        id='revenue'
        config={{
          'x</style><img src=x onerror=alert(1)>': {
            label: 'Evil',
            color: 'red',
          },
          revenue: { label: 'Revenue', color: '#22c55e' },
        }}
      >
        <AreaChart data={[{ value: 1 }]}>
          <Area dataKey='value' />
        </AreaChart>
      </ChartContainer>,
    );
    const style = container.querySelector('style');
    expect(style?.innerHTML).not.toContain('</style>');
    expect(style?.innerHTML).not.toContain('onerror');
    expect(style?.innerHTML).toContain('--color-revenue: #22c55e;');
    expect(container.querySelector('img')).toBeNull();
  });

  it('drops color values that could break out of the style element', () => {
    const { container } = render(
      <ChartContainer
        id='revenue'
        config={{
          revenue: {
            label: 'Revenue',
            color: 'red;}</style><script>alert(1)</script>',
          },
        }}
      >
        <AreaChart data={[{ value: 1 }]}>
          <Area dataKey='value' />
        </AreaChart>
      </ChartContainer>,
    );
    const style = container.querySelector('style');
    expect(style?.innerHTML).not.toContain('</style>');
    expect(style?.innerHTML).not.toContain('--color-revenue');
    expect(container.querySelector('script')).toBeNull();
  });

  it('does not render a style block for an unsafe id', () => {
    const { container } = render(
      <ChartContainer
        id='x]</style><script>alert(1)</script>'
        config={{ revenue: { label: 'Revenue', color: '#22c55e' } }}
      >
        <AreaChart data={[{ value: 1 }]}>
          <Area dataKey='value' />
        </AreaChart>
      </ChartContainer>,
    );
    expect(container.querySelector('style')).toBeNull();
    expect(container.querySelector('script')).toBeNull();
  });
});
