import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="mb-auto flex flex-col flex-1">{<Outlet />}</main>
      <Footer />
    </div>
  );
}

export default Main;
