import { Outlet } from "react-router-dom";
import navLinks from "routes/navLinks";
import TopBar from "./Navigation/TopBar";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar appTitle="Wise Support" links={navLinks} />
      <main className="flex-grow px-4 md:px-6 py-6 md:py-8 lg:px-20 lg:py-10 bg-gray-100 dark:bg-slate-900 dark:text-slate-200">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;