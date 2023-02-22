import React from "react";
import { useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <div className="center">
      <p>{`http://localhost:3000${location.pathname} Not Found`}</p>
    </div>
  );
}

export default NotFound;
