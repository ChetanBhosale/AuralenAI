interface SidebarPanelProps {
  title: string;
  subtitle: string;
}

export function SidebarPanel({ title, subtitle }: SidebarPanelProps) {
  return (
    <aside className="hidden md:flex md:w-[320px] lg:w-[360px] h-full flex-col overflow-hidden">
      <div className="relative flex h-full flex-col justify-end bg-muted shadow-float overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply grayscale"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col gap-5 p-10 lg:p-12">
          <div className="h-[3px] w-10 rounded-full bg-primary" />
          <h1
            className="text-display-sm text-foreground leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-body-sm text-muted-foreground max-w-[260px] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </aside>
  );
}
