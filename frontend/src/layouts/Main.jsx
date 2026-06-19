import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Main() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/homebg.jpg')] bg-cover bg-no-repeat bg-center bg-fixed font-roboto">
      <Navigation />
      <section className="mb-auto flex flex-col flex-1">{<Outlet />}</section>
      <Footer />
    </div>
  );
}

export default Main;
