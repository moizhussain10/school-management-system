import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import SchemaViewer from './pages/SchemaViewer';

import { 
  initialStudents, 
  initialTeachers, 
  initialClasses, 
  initialFees, 
  initialAttendance 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Shared State across pages
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [fees, setFees] = useState(initialFees);
  const [attendance, setAttendance] = useState(initialAttendance);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            students={students} 
            teachers={teachers} 
            classes={classes} 
            fees={fees} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'students':
        return <Students students={students} setStudents={setStudents} />;
      case 'teachers':
        return <Teachers teachers={teachers} setTeachers={setTeachers} />;
      case 'classes':
        return <Classes classes={classes} setClasses={setClasses} teachers={teachers} />;
      case 'attendance':
        return <Attendance attendance={attendance} setAttendance={setAttendance} />;
      case 'fees':
        return <Fees fees={fees} setFees={setFees} />;
      case 'schema':
        return <SchemaViewer />;
      default:
        return <Dashboard students={students} teachers={teachers} classes={classes} fees={fees} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar activeTab={activeTab} />
        
        <main className="p-6 flex-1 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}