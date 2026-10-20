import React from 'react';
import { Search, Bell, ShieldCheck } from 'lucide-react';

const Navbar = ({ activeTab }) => {
  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'students': return 'Student Management';
      case 'teachers': return 'Teacher Directory';
      case 'classes': return 'Class & Section Management';
      case 'attendance': return 'Daily Attendance Tracker';
      case 'fees': return 'Fee Collection & Billing';
      case 'schema': return 'MySQL Database & Backend Structure';
      default: return 'School Management System';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-800 capitalize">{getTitle()}</h2>
        <p className="text-xs text-gray-500">Academic Session 2026-2027</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records..."
            className="pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-indigo-500 transition-all w-64"
          />
        </div>

        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center bg-gradient-to-tr from-indigo-600 to-violet-500 text-white justify-center font-semibold text-sm shadow">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Admin User</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> System Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;