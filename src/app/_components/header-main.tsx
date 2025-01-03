import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { AuthContext } from "@/context/authContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useContext } from "react";

export function HeaderMain() {
  const { user } = useContext(AuthContext);
  return (
    <header className="flex justify-evenly py-4 w-full border-b border-border">
      <Link href={"/"} className="flex items-center gap-2">
        <Logo />
        <h4 className="font-semibold text-lg">dev-crud</h4>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/app" title="Lista de Tarefas">
                  Gerencie suas tarefas diárias, adicione novas e marque as
                  concluídas.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <Link href="" legacyBehavior passHref>
              <NavigationMenuLink>Documentation</NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      {user ? (
        <Button asChild size={"lg"}>
          <Link href={"/app"}>Tarefas</Link>
        </Button>
      ) : (
        <Button asChild variant={"outline"}>
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
