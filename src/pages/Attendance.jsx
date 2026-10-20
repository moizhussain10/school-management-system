import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Attendance = ({ attendance, setAttendance }) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-04');

  const toggleStatus = (id) => {
    setAttendance(attendance.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Present' ? 'Absent' : item.status === 'Absent' ? 'Late' : 'Present';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <h3 className="font-bold text-gray-800">Daily Class Attendance</h3>
          <p className="text-xs text-gray-400">Click student status to toggle between Present, Absent, and Late</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
            <tr>
              <th className="px-6 py-3.5">Roll No</th>
              <th className="px-6 py-3.5">Student</th>
              <th className="px-6 py-3.5">Class</th>
              <th className="px-6 py-3.5 text-center">Mark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono font-medium text-xs text-gray-600">{record.rollNo}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{record.studentName}</td>
                <td className="px-6 py-4 text-gray-600">{record.class}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleStatus(record.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                      record.status === 'Present' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : record.status === 'Absent' 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {record.status === 'Present' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {record.status === 'Absent' && <XCircle className="w-3.5 h-3.5" />}
                    {record.status === 'Late' && <Clock className="w-3.5 h-3.5" />}
                    {record.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;