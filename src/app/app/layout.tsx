import { PropsWithChildren } from "react";
import MainSidebar from "./_components/main-sidebar";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr] lg:grid-cols-1 h-screen">
      <Sheet>
        <SheetTrigger
          asChild
          className="hidden lg:flex absolute top-[18px] left-3"
        >
          <Button variant="secondary">
            <HamburgerMenuIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="max-w-lg">
          <MainSidebar />
        </SheetContent>
      </Sheet>
      <MainSidebar className="lg:hidden flex" />
      <main>{children}</main>
    </div>
  );
}
