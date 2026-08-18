import { render, within } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { AppShell, AppShellBody, AppShellRail, AppShellRailItem } from '@trycompai/design-system';

function Icon() {
  return <svg data-testid="icon" />;
}

/**
 * `AppShell` mirrors the rail into an always-mounted mobile drawer, so every
 * rail item exists twice in the DOM. Queries are scoped to the desktop rail.
 */
function renderRail(children: React.ReactNode) {
  const { container } = render(
    <AppShell>
      <AppShellBody>
        <AppShellRail>{children}</AppShellRail>
      </AppShellBody>
    </AppShell>
  );

  const rail = container.querySelector<HTMLElement>('[data-slot="app-shell-rail"]');
  expect(rail).not.toBeNull();
  return rail as HTMLElement;
}

function getRailItem(rail: HTMLElement) {
  const items = rail.querySelectorAll<HTMLElement>('[data-slot="app-shell-rail-item"]');
  expect(items).toHaveLength(1);
  return items[0];
}

describe('AppShellRailItem', () => {
  it('renders a button by default', () => {
    const rail = renderRail(<AppShellRailItem icon={<Icon />} />);

    const item = getRailItem(rail);
    expect(item.tagName).toBe('BUTTON');
    // A bare <button> - Base UI's default `type="button"` must not sneak in.
    expect(item.hasAttribute('type')).toBe(false);
    // No `isActive` passed, so no `data-active` attribute at all.
    expect(item.hasAttribute('data-active')).toBe(false);
    expect(item.querySelector('[data-testid="icon"]')).not.toBeNull();
  });

  it('renders data-active="false" for an explicitly inactive item', () => {
    const rail = renderRail(<AppShellRailItem icon={<Icon />} isActive={false} />);

    expect(getRailItem(rail)).toHaveAttribute('data-active', 'false');
  });

  it('marks the active item with data-active="true"', () => {
    const rail = renderRail(<AppShellRailItem icon={<Icon />} isActive />);

    expect(getRailItem(rail)).toHaveAttribute('data-active', 'true');
  });

  it('renders as the element given to `render`, with no nested button', () => {
    const rail = renderRail(
      <AppShellRailItem icon={<Icon />} render={<a href="/compliance" />} />
    );

    const item = getRailItem(rail);
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('href', '/compliance');
    expect(rail.querySelectorAll('[data-slot="app-shell-rail-item"] button')).toHaveLength(0);
    // The rail item's own styling still applies to the anchor.
    expect(item.className).toContain('size-10');
    expect(item.querySelector('[data-testid="icon"]')).not.toBeNull();
  });

  it('keeps the tooltip label and aria-label when rendered as an anchor', () => {
    const rail = renderRail(
      <AppShellRailItem icon={<Icon />} label="Compliance" render={<a href="/compliance" />} />
    );

    const item = getRailItem(rail);
    expect(item.tagName).toBe('A');
    expect(rail.querySelectorAll('[data-slot="app-shell-rail-item"] button')).toHaveLength(0);
    expect(within(rail).getByLabelText('Compliance')).toBe(item);
  });

  it('still renders a button when a label is set and `render` is omitted', () => {
    const rail = renderRail(<AppShellRailItem icon={<Icon />} label="Compliance" />);

    const item = getRailItem(rail);
    expect(item.tagName).toBe('BUTTON');
    expect(within(rail).getByLabelText('Compliance')).toBe(item);
  });

  it('forwards props to the rendered element in both modes', () => {
    const buttonRail = renderRail(<AppShellRailItem icon={<Icon />} disabled id="rail-button" />);
    expect(getRailItem(buttonRail)).toHaveAttribute('id', 'rail-button');
    expect(getRailItem(buttonRail)).toBeDisabled();

    const anchorRail = renderRail(
      <AppShellRailItem icon={<Icon />} id="rail-anchor" render={<a href="/x" />} />
    );
    expect(getRailItem(anchorRail)).toHaveAttribute('id', 'rail-anchor');
  });

  // CS-773: the rail is re-rendered into the always-mounted mobile drawer, so
  // any id must come from `React.useId()` rather than being hard-coded -
  // duplicate DOM ids break the Base UI tooltip.
  it('gives every rail item copy a unique id', () => {
    const { container } = render(
      <AppShell>
        <AppShellBody>
          <AppShellRail>
            <AppShellRailItem icon={<Icon />} label="One" />
            <AppShellRailItem icon={<Icon />} label="Two" render={<a href="/two" />} />
          </AppShellRail>
        </AppShellBody>
      </AppShell>
    );

    // Two items, each rendered twice (desktop rail + mobile drawer).
    const items = container.querySelectorAll('[data-slot="app-shell-rail-item"]');
    expect(items).toHaveLength(4);

    const ids = Array.from(items, (item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
