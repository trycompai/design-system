interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
}
