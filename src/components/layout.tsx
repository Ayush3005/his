import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar";
import AppSidebar from "./app-sidebar";

function LayoutInner({ children }: PropsWithChildren) {
  const { side, state, isMobile } = useSidebar();

  const mainStyle: React.CSSProperties = {
    transition: "margin 0.2s ease, width 0.2s ease",
  };

  if (!isMobile) {
    if (state === "expanded") {
      if (side === "left") {
        mainStyle.marginLeft = "var(--sidebar)";
        mainStyle.marginRight = "0.5rem";
      } else {
        mainStyle.marginRight = "var(--sidebar)";
        mainStyle.marginLeft = "0.5rem";
      }
    } else {
      if (side === "left") {
        mainStyle.marginLeft = "var(--sidebar-width-icon)";
        mainStyle.marginRight = "0.5rem";
      } else {
        mainStyle.marginRight = "var(--sidebar-width-icon)";
        mainStyle.marginLeft = "0.5rem";
      }
    }
  } else {
    mainStyle.marginLeft = "0.5rem";
    mainStyle.marginRight = "0.5rem";
  }
  

  return (
    <div
      className={`min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100 gap-1 ${
        side === "right" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <AppSidebar />
      <main
        style={mainStyle}
        className="relative min-h-fit w-full flex-1 px-2 py-2 transition-[margin,width] duration-300 ease-in-out bg-white dark:bg-gray-900 shadow-lg rounded-lg my-2"
      >
        <div
          className={`block md:hidden absolute top-4 z-50 ${
            side === "right" ? "right-4" : "left-4"
          }`}
        >
          <SidebarTrigger className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md transition-colors" />
        </div>

        {children}
      </main>
    </div>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  );
}
