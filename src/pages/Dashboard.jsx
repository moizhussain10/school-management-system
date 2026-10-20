import React from 'react';
import { Users, UserCheck, BookOpen, DollarSign, Clock, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard = ({ students, teachers, classes, fees, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Top Cards Overview */}
      <div className="grid grid-[#121212] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Students" 
          value={students.length} 
          subtext="Active Enrolled" 
          icon={Users} 
          color="bg-indigo-600" 
          border="border-t-indigo-600" 
        />
        <StatCard 
          title="Total Teachers" 
          value={teachers.length} 
          subtext="Faculty Staff" 
          icon={UserCheck} 
          color="bg-emerald-600" 
          border="border-t-emerald-600" 
        />
        <StatCard 
          title="Active Classes" 
          value={classes.length} 
          subtext="Academic Sections" 
          icon={BookOpen} 
          color="bg-amber-500" 
          border="border-t-amber-500" 
        />
        <StatCard 
          title="Fee Collected" 
          value="$530.00" 
          subtext="This Month" 
          icon={DollarSign} 
          color="bg-violet-600" 
          border="border-t-violet-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Student Enrollments */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-base">Recent Student Registrations</h3>
            <button 
              onClick={() => setActiveTab('students')}
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">Roll No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.slice(0, 4).map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono font-medium text-xs text-gray-600">{student.rollNo}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                    <td className="px-4 py-3 text-gray-600">{student.class}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick System Info Widget */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-base mb-2">Backend Architecture</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              This system is formatted to connect with a standard **MySQL** database via a **Node.js Express API**.
            </p>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700 block">Database</span>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0 Engine</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700 block">API REST Standard</span>
                <span className="text-xs text-slate-500 font-mono">Express.js / async pool</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('schema')}
            className="w-full mt-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            Inspect MySQL Tables & SQL Queries
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;