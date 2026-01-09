'use client';

import * as React from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    // Start fade in
    const timer = requestAnimationFrame(() => {
      setOpacity(1);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      style={{
        opacity,
        transition: 'opacity 400ms ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
