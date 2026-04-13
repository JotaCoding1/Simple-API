import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-(--bg-main-color) text-(--text-main-color)">
      <div className="fixed top-0 left-0 w-full z-40 shadow-md">
        <Navbar />
      </div>

      <main className="flex-1 px-4 py-6 mt-16">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

