import React, { useState } from 'react';
import { Plus, Trash2, Mail, Phone, BookOpen } from 'lucide-react';
import Modal from '../components/Modal';

const Teachers = ({ teachers, setTeachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: 'Mathematics',
    qualification: '',
    phone: '',
    email: '',
    status: 'Active'
  });

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setTeachers([{ id: Date.now(), ...formData }, ...teachers]);
    setFormData({ name: '', subject: 'Mathematics', qualification: '', phone: '', email: '', status: 'Active' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800">Faculty Members ({teachers.length})</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative group">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-base">{teacher.name}</h4>
                <p className="text-xs font-medium text-indigo-600 flex items-center gap-1 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" /> {teacher.subject}
                </p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {teacher.status}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Qualification:</span> {teacher.qualification || 'N/A'}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> {teacher.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" /> {teacher.email}
              </p>
            </div>

            <button 
              onClick={() => handleDelete(teacher.id)}
              className="absolute bottom-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Faculty Member">
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Teacher Name</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Dr. John Smith"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Subject Specialization</label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Mathematics"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Qualification</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="M.Sc / Ph.D"
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="+92 3..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="teacher@school.edu"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
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
              Save Teacher
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Teachers;