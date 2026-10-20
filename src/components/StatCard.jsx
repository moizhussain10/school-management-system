import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, color, border }) => (
  <div className={`bg-white p-6 rounded-xl border-t-4 ${border} border-x border-b border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl ${color} text-white shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default StatCard;