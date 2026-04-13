import { NavItem } from "./NavbarItem";

export function Navbar() {
  return (
    <nav className="w-full bg-(--nav-main-color) px-4 py-4 sm:px-6 lg:px-8 backdrop-blur">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center ">
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mr-8 select-none">
            UniFil<span className="text-amber-600">.</span>
          </div>
          <div className="text-sm ml-1 font-semibold tracking-wide sm:text-base md:text-lg text-white hover:text-amber-100 transition-colors">
            <NavItem to="/">Home</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}
