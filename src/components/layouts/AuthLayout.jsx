import { Outlet } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";

function AuthLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default AuthLayout;