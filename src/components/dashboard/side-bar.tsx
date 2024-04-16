import { cn } from "@/lib/utils";
import Link from "next/link";

export type SidebarGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

type SidebarLinkProps = {
  href: string;
  active?: boolean;
};

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={cn([
        "border-r border-border flex flex-col space-y-6",
        className,
      ])}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header
      className={cn([
        "p-6 flex border-b border-border items-center gap-1",
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function SidebarTitleHeader({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <h4 className={cn(["font-semibold text-lg", className])}>{children}</h4>
  );
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return (
    <main className={cn(["flex flex-col pt-1 px-6", className])}>
      {children}
    </main>
  );
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <main className={cn(["flex flex-col", className])}>{children}</main>;
}

export function SidebarLink({
  className,
  children,
  href,
  active,
}: SidebarGenericProps<SidebarLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        "text-sm px-3 py-2 rounded-md flex items-center",
        active && "bg-secondary font-medium",
        className,
      ])}
    >
      {children}
    </Link>
  );
}

export function SidebarLinkDivisor({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <h4
      className={cn([
        "text-xs uppercase text-muted-foreground ml-9",
        className,
      ])}
    >
      {children}
    </h4>
  );
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer
      className={cn([
        "flex items-center justify-center gap-2 p-5  mt-auto border-t border-border",
        className,
      ])}
    >
      {children}
    </footer>
  );
}

export function SidebarFooterMain({
  className,
  children,
}: SidebarGenericProps) {
  return <span className={cn(["flex flex-col", className])}>{children}</span>;
}
