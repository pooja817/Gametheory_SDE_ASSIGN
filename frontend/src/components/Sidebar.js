// src/components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white flex flex-col justify-between p-5">
      <div>
        <h2 className="text-2xl font-bold mb-5">NEXUS</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
          <li className="cursor-pointer text-blue-400 font-semibold">
            Schedule
          </li>
          <li className="cursor-pointer hover:text-gray-300">Customers</li>
          <li className="cursor-pointer hover:text-gray-300">Coachings</li>
          <li className="cursor-pointer hover:text-gray-300">Attendance</li>
        </ul>
      </div>
      <div className="text-sm">
        <p className="font-bold">Tarikul</p>
        <p>Captain</p>
      </div>
    </div>
  );
};

export default Sidebar;
