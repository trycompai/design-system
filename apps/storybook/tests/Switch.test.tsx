import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Switch } from '@trycompai/design-system';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('renders checked when defaultChecked is true', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();

    await user.click(switchEl);
    expect(switchEl).toBeChecked();

    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });

  it('has data-slot attribute', () => {
    render(<Switch data-testid="switch" />);
    expect(screen.getByTestId('switch')).toHaveAttribute('data-slot', 'switch');
  });

  it('applies disabled styling when disabled', () => {
    render(<Switch disabled data-testid="switch" />);
    expect(screen.getByTestId('switch')).toHaveAttribute('data-disabled');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Switch disabled />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();

    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });

  it('supports required attribute', () => {
    render(<Switch required data-testid="switch" />);
    expect(screen.getByTestId('switch')).toHaveAttribute('data-required');
  });

  it('applies size variant', () => {
    render(<Switch size="sm" data-testid="switch" />);
    expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'sm');
  });

  it('defaults to default size', () => {
    render(<Switch data-testid="switch" />);
    expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'default');
  });
});
