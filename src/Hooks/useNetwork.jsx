import { useEffect } from "react";
import { useState } from "react";

export default function useNetwork() {
  let [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    detectOnline();
  }, []);

  function detectOnline() {
    window.addEventListener("online", function () {
      setIsOnline(true);
      console.log("online");
    });

    window.addEventListener("offline", function () {
      setIsOnline(false);
      console.log("offline");
    });
  }

  return (
    <>
      {!isOnline ? (
        <div className="network">
          <i className="fas fa-wifi"></i> You are offline
        </div>
      ) : (
        ""
      )}
    </>
  );
}
