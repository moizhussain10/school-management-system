import React from 'react';
import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

const Fees = ({ fees, setFees }) => {
  const markAsPaid = (id) => {
    setFees(fees.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Paid', date: new Date().toISOString().split('T')[0] };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-800">Fee Payment Records</h3>
          <p className="text-xs text-gray-400">Track student tuition status & update billing records</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
            <tr>
              <th className="px-6 py-3.5">Roll No</th>
              <th className="px-6 py-3.5">Student</th>
              <th className="px-6 py-3.5">Month</th>
              <th className="px-6 py-3.5">Amount</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Payment Date</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fees.map((fee) => (
              <tr key={fee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs text-gray-600">{fee.rollNo}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{fee.studentName}</td>
                <td className="px-6 py-4 text-gray-600">{fee.month}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{fee.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-medium ${
                    fee.status === 'Paid' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : fee.status === 'Pending' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {fee.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {fee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{fee.date}</td>
                <td className="px-6 py-4 text-right">
                  {fee.status !== 'Paid' && (
                    <button
                      onClick={() => markAsPaid(fee.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;