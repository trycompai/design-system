import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '@trycompai/design-system';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked when defaultChecked is true', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('has data-slot attribute', () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveAttribute('data-slot', 'checkbox');
  });

  it('applies disabled styling when disabled', () => {
    render(<Checkbox disabled data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveAttribute('data-disabled');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('supports required attribute', () => {
    render(<Checkbox required data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveAttribute('data-required');
  });

  it('shows check icon when checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-checked');
  });
});
