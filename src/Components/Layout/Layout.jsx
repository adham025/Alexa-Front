import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline } from "react-detect-offline";
import { useEffect, useState } from "react";

export default function Layout() {
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setShowOnline(true);
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (showOnline) {
      const timer = setTimeout(() => {
        setShowOnline(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showOnline]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>

      <div>
        {showOnline && (
          <div className="network">
            <i className="fas fa-wifi me-2"></i>
            Your internet connection has been restored
          </div>
        )}
        {/* <Offline polling={{ interval: 20000 }}>
          <div className="network">
            <i className="fas fa-wifi me-2"></i>
            You are currently offline
          </div>
        </Offline> */}
      </div>

      <Footer />
    </>
  );
}