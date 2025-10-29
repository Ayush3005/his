"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import LanguageSelector from "./LanguageSelector";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import LanguageIcon from "@mui/icons-material/Language";

const iconMap: Record<string, React.ElementType> = {
  Dashboard: DashboardIcon,
  Patients: PeopleIcon,
  Practitioners: LocalHospitalIcon,
  Encounters: AssignmentIcon,
  Documents: AssignmentIcon,
  Notifications: NotificationsIcon,
  "Audit Logs": StorageIcon,
  Analytics: BarChartIcon,
  Consent: SecurityIcon,
  Settings: SettingsIcon,
};

export default function AppSidebar() {
  const [fontScale, setFontScale] = useState(1.2);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { t } = useTranslation("sidebarTranslation");

  const mainItems = t("mainItems", { returnObjects: true }) as {
    id: string;
    title: string;
    url: string;
  }[];

  const systemItems = t("systemItems", { returnObjects: true }) as {
    id: string;
    title: string;
    url: string;
  }[];

  const userMenu = t("userMenu", { returnObjects: true }) as Record<
    string,
    string
  >;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      fontScale.toString()
    );
  }, [fontScale]);

  const increaseFont = () => setFontScale((prev) => Math.min(prev + 0.1, 2));
  const decreaseFont = () => setFontScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetFont = () => setFontScale(1.2);

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        {/* Main Group */}
        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel>{t("groupLabels.main")}</SidebarGroupLabel>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={increaseFont}
                className="h-4 w-4"
              >
                <AddIcon fontSize="small" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetFont}
                className="h-4 w-4"
              >
                <FormatColorTextIcon fontSize="small" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseFont}
                className="h-4 w-4"
              >
                <RemoveIcon fontSize="small" />
              </Button>
            </div>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const Icon = iconMap[item.id];
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                      >
                        {Icon && <Icon fontSize="small" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Group */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("groupLabels.system")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => {
                const Icon = iconMap[item.id];

                if (item.id === "Settings") {
                  return (
                    <Collapsible
                      key={item.title}
                      open={settingsOpen}
                      onOpenChange={setSettingsOpen}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="flex items-center w-full text-sm font-medium">
                            {Icon && <Icon fontSize="small" />}
                            <span className="ml-2">{item.title}</span>
                            <ChevronRightIcon
                              fontSize="small"
                              className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild>
                                <div className="flex items-center gap-2">
                                  <LanguageIcon fontSize="small" />
                                  <LanguageSelector />
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                      >
                        {Icon && <Icon fontSize="small" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <PersonIcon /> Username
                  <ExpandMoreIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>{userMenu.account}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{userMenu.billing}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>{userMenu.signout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
