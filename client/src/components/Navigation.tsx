import { NavLink } from "react-router-dom";

const links = [
  { to: "/users", label: "Usuarios" },
];

function Navigation() {
  return (
    <header className="flex flex-row justify-between items-center border-b-2 border-gray-200 px-6 py-4">
      <h1 className="font-bold text-xl text-blue-500">Ingeniería Web</h1>
      <nav className="flex flex-row justify-between">
        <ul className="flex flex-row">
          <li className="mr-4">
            {
              links.map((link, index) => (
                <NavLink key={index} className={
                  (isActive: boolean) => {
                    return `text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded px-4 py-2 ${isActive ? "underline" : ""}`;
                  }
                } to={link.to}>
                  {link.label}
                </NavLink>
              ))
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;