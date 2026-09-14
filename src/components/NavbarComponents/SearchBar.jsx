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
      {/* Pulsante ricerca */}
      <button
        className="btn btn-square btn-ghost"
        onClick={() =>
          document.getElementById("search_modal").showModal()
        }
      >
        <FaSearch className="text-xl"/>
      </button>

      {/* Modale */}
      <dialog id="search_modal" className="modal">
        <div className="modal-box">

          <h3 className="font-bold text-lg mb-4">
            Cerca un videogioco
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Cerca..."
              className="input w-full"
              onChange={handleChange}
            />

            <Link
              className="btn"
              to={ slug ? `search/${slug}` : "#" }
              onClick={() =>
                document.getElementById("search_modal").close()
              }
            >
              Cerca
            </Link>
          </div>

        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default SearchBar;