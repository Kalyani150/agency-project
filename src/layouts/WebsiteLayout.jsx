import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import ScrollAnimations from "../components/ScrollAnimations";

function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      <PublicNavbar />

      {/* Global website animations */}
      <ScrollAnimations />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />

    </div>
  );
}

export default WebsiteLayout;