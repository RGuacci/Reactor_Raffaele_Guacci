import SearchBar from "../NavbarComponents/SearchBar";
import ProfileMenu from "../NavbarComponents/ProfileMenu";
import { Link, useLocation } from "react-router";
import { FaBars } from "react-icons/fa6";
import routes from "../../router/routes";

function Navbar() {
  const location = useLocation();

  const showGenres = location.pathname === routes.home;

  return (
    <nav className="navbar fixed top-0 left-0 z-50 bg-nav-gray h-16 px-3 md:px-5">
      <div className="flex-1">
        <Link
          to={routes.home}
          className="btn btn-ghost text-3xl md:text-2xl font-electro px-2"
        >
          Reactor
        </Link>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {showGenres && (
          <label
            htmlFor="my-drawer"
            aria-label="open sidebar"
            className="btn btn-ghost btn-square md:w-auto md:px-3 gap-2 text-xl"
          >
            <FaBars />
            <span className="hidden md:inline text-xl">Generi</span>
          </label>
        )}

        <SearchBar />
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
