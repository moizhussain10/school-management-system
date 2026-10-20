import React, { useState } from 'react';
import { Plus, Users, DoorOpen, UserCheck } from 'lucide-react';
import Modal from '../components/Modal';

const Classes = ({ classes, setClasses, teachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    section: 'A',
    room: '',
    capacity: 35,
    enrolled: 0,
    classTeacher: teachers[0]?.name || 'Unassigned'
  });

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setClasses([{ id: Date.now(), ...formData }, ...classes]);
    setFormData({ name: '', section: 'A', room: '', capacity: 35, enrolled: 0, classTeacher: teachers[0]?.name || '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800">Academic Classes & Classrooms</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{cls.name}</h4>
                <span className="text-xs text-gray-400 font-medium">Section {cls.section}</span>
              </div>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-md border border-indigo-100">
                {cls.room}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-500" /> Class Teacher:
                </span>
                <span className="font-semibold text-gray-800">{cls.classTeacher}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-3.5 h-3.5 text-indigo-500" /> Capacity:
                </span>
                <span className="font-semibold text-gray-800">{cls.enrolled} / {cls.capacity} Students</span>
              </div>
            </div>

            {/* Progress bar for class fill ratio */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cls.enrolled / cls.capacity) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Class Section">
        <form onSubmit={handleAddClass} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Class Name</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Grade 12"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Section</label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="A"
                value={formData.section}
                onChange={(e) => setFormData({...formData, section: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Room Number</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Room 302"
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Class Teacher</label>
            <select 
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              value={formData.classTeacher}
              onChange={(e) => setFormData({...formData, classTeacher: e.target.value})}
            >
              {teachers.map(t => (
                <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
            >
              Create Class
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Classes;