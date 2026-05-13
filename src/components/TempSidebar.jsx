import React from "react";
import { X } from "lucide-react";

function Sidebar({
  sidebar,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) {

  const menuItems = [
    "Dashboard",
    "Students",
    "Teachers",
    "Courses",
    "Attendance",
    "Results",
    "Settings",
  ];

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-64 md:w-64 bg-slate-900 text-white
      transition-transform duration-300 overflow-y-auto shadow-2xl
      ${sidebar ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 relative">

        <h1 className="text-xl font-bold">
          DashWave
        </h1>

        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all"
        >
          <X size={20} />
        </button>

      </div>

      {/* Menu */}
      <div className="p-4 space-y-2">

        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200
            ${
              activeTab === item
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;
