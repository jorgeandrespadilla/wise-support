import { Outlet } from "react-router-dom";
import { LinkConfig } from "types/ui";
import Navigation from "./Navigation";

const links: LinkConfig[] = [
  { to: "/users", label: "Usuarios" },
];

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation title="Ingeniería Web" links={links} />
      <main className="flex-grow px-6 py-8 lg:px-20 lg:py-10 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;