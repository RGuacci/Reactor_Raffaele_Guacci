import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";

function SearchBar() {
  const [slug, setSlug] = useState("");

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Cerca"
        className="input w-24 md:w-auto"
        onChange={handleChange}
      />
      
      {/* Ho aggiunto questa condizione per impedire la ricerca ad un utente che non ha scritto nulla nella searchbar */}
      <Link className="btn btn-square" to={ slug ? `search/${slug}` : `#` }>
        <FaSearch />
      </Link>
    </>
  );
}

export default SearchBar;
