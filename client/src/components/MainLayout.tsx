import { Outlet } from "react-router-dom";
import navLinks from "routes/navLinks";
import TopBar from "./Navigation/TopBar";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Ingeniería Web" links={navLinks} />
      <main className="flex-grow px-6 py-8 lg:px-20 lg:py-10 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;