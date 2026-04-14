import { Outlet } from "react-router-dom";
import { CustomSidebar } from "../ui/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <CustomSidebar></CustomSidebar>
      <div className="flex-1 bg-slate-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
