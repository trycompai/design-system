import { Renew } from '@carbon/icons-react';

function Spinner({ ...props }: Omit<React.ComponentProps<typeof Renew>, 'className'>) {
  return (
    <Renew
      role="status"
      aria-label="Loading"
      className="size-4 shrink-0 animate-spin"
      {...props}
    />
  );
}

export { Spinner };
