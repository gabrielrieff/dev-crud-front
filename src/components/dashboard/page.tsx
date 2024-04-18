import { cn } from "@/lib/utils";

export type DashboardPageGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DashboardPage({
  className,
  children,
}: DashboardPageGenericProps) {
  return <section className={cn(["h-full", className])}>{children}</section>;
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <header
      className={cn([
        "border-b border-border p-[22px] flex justify-between items-center",
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <h1 className={cn(["font-semibold uppercase", className])}>{children}</h1>
  );
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  return <main className={cn(["p-6", className])}>{children}</main>;
}
