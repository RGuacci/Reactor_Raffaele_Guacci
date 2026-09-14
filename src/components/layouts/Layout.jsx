import { Outlet, useLoaderData } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import SideBar from "../LayoutComponents/SideBar";

function Layout() {
  const genres = useLoaderData();

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16">
          <section className="mb-5">
            <Outlet />
          </section>
        </main>

        <Footer />
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <SideBar genres={genres} />
      </div>
    </div>
  );
}

export default Layout;
