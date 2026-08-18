import { Renew } from '@carbon/icons-react';

/**
 * An indeterminate loading indicator.
 *
 * The `role="status"` lives on a wrapper rather than on the icon because Carbon forces
 * `role="img"` onto any icon carrying an `aria-label` — see `getAttributes` in
 * `@carbon/icon-helpers`, which does `iconAttributes.role = 'img'` unconditionally. Setting
 * the role on `Renew` directly is silently discarded, and the spinner is then announced as a
 * static image instead of a live region, so assistive technology never hears the loading
 * state change. `display: contents` keeps the wrapper out of layout, so the icon still
 * participates directly in whatever flex or grid container it was placed in.
 */
function Spinner({ ...props }: Omit<React.ComponentProps<typeof Renew>, 'className'>) {
  return (
    <span role="status" aria-label="Loading" className="contents">
      <Renew aria-hidden className="size-4 shrink-0 animate-spin" {...props} />
    </span>
  );
}

export { Spinner };
