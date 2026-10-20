import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Modal from "../components/Modal";

const API_URL =
  "http://localhost/school-management-system/backend/config/Api/students.php";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State aligned with MySQL Database columns
  const [formData, setFormData] = useState({
    roll_number: "",
    first_name: "",
    last_name: "",
    class_name: "Grade 10-A",
    gender: "Male",
    guardian_contact: "",
    email: "",
    status: "Active",
  });

  // 1. Fetch Students from PHP API
  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const fullName = `${s.first_name || ""} ${s.last_name || ""}`.toLowerCase();
    const roll = s.roll_number || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) || roll.includes(searchTerm)
    );
  });

  // Classes list generate karne ka function
  const generateClassOptions = () => {
    const baseClasses = ["Nursery", "Prep"];
    for (let i = 1; i <= 12; i++) {
      baseClasses.push(`Class ${i}`);
    }

    const sections = ["A", "B", "C"];
    const options = [];

    baseClasses.forEach((cls) => {
      sections.forEach((sec) => {
        options.push(`${cls}-${sec}`);
      });
    });

    return options;
  };

  const classOptions = generateClassOptions();

  // Handle Form Submit (Yeh hum agle step me PHP POST API se connect karenge)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Yahan await add kar dein
      const response = await fetch(
        "http://localhost/school-management-system/backend/config/Api/students.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("student registered successfully");

        // Table list refresh karne ke liye agar fetchStudents function hai toh use yahan call kar sakte hain:
        // fetchStudents();

        setFormData({
          roll_number: "",
          first_name: "",
          last_name: "",
          class_name: "Class 1-A",
          gender: "Male",
          guardian_contact: "",
          email: "",
          status: "Active",
        });

        setIsModalOpen(false);
      } else {
        alert(`Error: ${data.message || "Data save nahi ho saka"}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Server connect nahi ho pa raha. Backend check karein.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or roll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Student
        </button>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
              <tr>
                <th className="px-6 py-3.5">Roll No</th>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Gender</th>
                <th className="px-6 py-3.5">Contact</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-indigo-600 text-xs">
                      {student.roll_number}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="text-xs text-gray-400">{student.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {student.guardian_contact}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                          student.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Student"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Moiz"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Sheikh"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Roll Number, Class & Gender */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="1005"
                value={formData.roll_number}
                onChange={(e) =>
                  setFormData({ ...formData, roll_number: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Class & Section
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                value={formData.class_name}
                onChange={(e) =>
                  setFormData({ ...formData, class_name: e.target.value })
                }
              >
                {classOptions.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Contact & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Guardian Contact
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="+92 300..."
                value={formData.guardian_contact}
                onChange={(e) =>
                  setFormData({ ...formData, guardian_contact: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="student@school.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm"
            >
              Save Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Students;
