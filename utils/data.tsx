import DashboardIcon from "@/svg/dashboard";
import Project from "@/svg/project";
import Tasks from "@/svg/tasks";

export const meunItems = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <Project />,
    title: "Projects",
    link: "/",
  },
  {
    icon: <Tasks />,
    title: "My Tasks",
    link: "/",
  },
];
