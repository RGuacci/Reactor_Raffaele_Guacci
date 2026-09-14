import SearchBar from "../NavbarComponents/SearchBar";
import ProfileMenu from "../NavbarComponents/ProfileMenu";

import { Link } from "react-router";

import routes from "../../router/routes";

function Navbar() {
  return (
    <nav className="navbar bg-nav-gray h-16">
      <div className="flex-1">
        <Link to={routes.home} className="btn btn-ghost text-xl font-electro">
          Reactor
        </Link>
      </div>

      <div className="flex gap-2">
        <SearchBar />
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
