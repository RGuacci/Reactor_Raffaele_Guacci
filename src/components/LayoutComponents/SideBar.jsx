import { Link } from "react-router";

function SideBar({ genres }) {
  return (
    <nav className="bg-nav-gray min-h-full w-72">
      <ul className="grid grid-cols-2 gap-4 px-5 py-10">
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <Link
                to={`/genre/${genre.slug}`}
                className="block w-full rounded px-2 py-2 text-center transition-colors duration-200 hover:bg-base-300 hover:text-primary"
              >
                {genre.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideBar;
