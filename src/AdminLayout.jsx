import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Admin/Navbar";
import { Sidebar } from "./components/Admin/Sidebar";
export const AdminLayout=()=>{
    return(
        <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          {/* <Dashboard /> */}
            <Outlet />
          {}
        </div>
      </div>
    )
}