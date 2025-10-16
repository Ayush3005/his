import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./app-sidebar";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="relative min-h-screen container mx-auto px-4 py-8 ">
          <div className="block md:hidden absolute top-4 left-4 z-50">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
