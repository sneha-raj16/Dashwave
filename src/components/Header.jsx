import React from "react";
import {
  Menu,
  Moon,
  Sun,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

function Header({
  user,
  setSidebarOpen,
  sidebar,
  darkMode,
  setDarkMode,
  setShowProfile,
  setShowLogin,
  setShowSignup,
}) {
  return (
    <div
      className={`border-b px-3 sm:px-4 py-2 text-sm sm:text-base sticky top-0 z-40 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/80 border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">

        {/* Left */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">

          {!sidebar && (
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-xl transition-all ${
                darkMode
                  ? "hover:bg-white/10"
                  : "hover:bg-gray-200"
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            DashWave
          </h1>

        </div>

        {/* Right */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-auto overflow-x-auto">

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all ${
              darkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {user ? (
            <>
              {/* Profile */}
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
              >
                <User className="w-5 h-5" />
                {user.name}
              </button>
            </>
          ) : (
            <>
              {/* Sign Up */}
              <button
                onClick={() => setShowSignup(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </button>

              {/* Login */}
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition-all"
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Header;