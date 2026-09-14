import SearchBar from "../NavbarComponents/SearchBar";
import ProfileMenu from "../NavbarComponents/ProfileMenu";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";
import routes from "../../router/routes";

function Navbar() {
  return (
    <nav className="navbar bg-nav-gray h-16 px-3 md:px-5">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to={routes.home}
          className="btn btn-ghost text-xl md:text-3xl font-electro px-2"
        >
          Reactor
        </Link>
      </div>

      {/* Azioni */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Generi */}
        <label
          htmlFor="my-drawer"
          aria-label="open sidebar"
          className="btn btn-ghost btn-square md:w-auto md:px-3 gap-2"
        >
          <FaBars className="text-2xl" />
          <span className="hidden md:inline text-xl">Generi</span>
        </label>

        <SearchBar />

        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
