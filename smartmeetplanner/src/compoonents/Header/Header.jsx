import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   // remove tokens + user
    setUser(null);          // update parent state
    navigate("/login", { replace: true }); // redirect without reload
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow h-[10%] min-h-[60px]">

      {/* Left: Logo + Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
          M
        </div>
        <div>
          <h1 className="text-lg font-bold">MeetingAI</h1>
          <p className="text-xs text-gray-500">
            AI-Powered Meeting Analysis
          </p>
        </div>
      </div>

      {/* Right: Login / User */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user.name}</span>

            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {user.name?.[0]?.toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;