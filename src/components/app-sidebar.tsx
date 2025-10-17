import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
const mainItems = [
  { title: "Dashboard", url: "/", icon: DashboardIcon },
  { title: "Patients", url: "/patients", icon: PeopleIcon },
  { title: "Practitioners", url: "/practitioners", icon: LocalHospitalIcon },
  { title: "Encounters", url: "/encounters", icon: AssignmentIcon },
  { title: "Documents", url: "/documents", icon: AssignmentIcon },
  { title: "Notifications", url: "/notifications", icon: NotificationsIcon },
];

const systemItems = [
  { title: "Audit Logs", url: "/audit", icon: StorageIcon },
  { title: "Analytics", url: "/analytics", icon: BarChartIcon },
  { title: "Consent", url: "/consent", icon: SecurityIcon },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

export default function AppSidebar() {
  const [fontScale, setFontScale] = useState(1.2);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      fontScale.toString()
    );
  }, [fontScale]);

  function increaseFont() {
    if (fontScale < 2) {
      setFontScale((prev) => Math.min(prev + 0.1, 2));
      console.log(fontScale, "increased");
    }
  }
  function decreaseFont() {
    if (fontScale >= 1) {
      setFontScale((prev) => Math.max(prev - 0.1, 0.5));
      console.log(fontScale, "decreased");
    }
  }
  function resetFont() {
    setFontScale(1.2);
    console.log(fontScale, "reset");
  }

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel>Health Information System</SidebarGroupLabel>

            {/* Font control buttons beside the label */}
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={increaseFont}
                className="h-4 w-4"
              >
                <AddIcon fontSize="small"/>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetFont}
                className="h-4 w-4"
              >
                <FormatColorTextIcon fontSize="small"/>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseFont}
                className="h-4 w-4"
              >
                <RemoveIcon fontSize="small"/>
              </Button>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <item.icon fontSize="small" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <item.icon fontSize="small" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <PersonIcon /> Username
                  <ExpandLessIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
