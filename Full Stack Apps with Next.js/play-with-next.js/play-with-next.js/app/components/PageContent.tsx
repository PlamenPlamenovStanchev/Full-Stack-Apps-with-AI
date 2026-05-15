interface PageContentProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function PageContent({
  children,
  maxWidth = "xl",
}: PageContentProps) {
  const widthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
  }[maxWidth];

  return (
    <div className={`${widthClass} mx-auto px-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
}
