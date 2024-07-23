import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../api/StudentApi';
import StudentForm from './StudentForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    refreshStudents();
  }, []);

  const refreshStudents = () => {
    getStudents()
      .then((res) => {
        setStudents(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this student?')) {
      deleteStudent(id)
        .then((res) => {
          toast.success('Student deleted successfully!');
          refreshStudents();
        })
        .catch((err) => {
          toast.error('Failed to delete student.');
          console.error(err);
        });
    }
  };

  const onEdit = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:justify-between mb-4"></div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Form on the left */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white shadow-md rounded p-4 md:p-6">
            <StudentForm
              refreshStudents={refreshStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>

        {/* Student list centered */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white shadow-md rounded p-4 md:p-6">
            <h2 className="text-xl font-semibold text-center mb-5">Students List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{student.stname}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{student.course}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-4 text-sm"
                        onClick={() => onEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 text-sm"
                        onClick={() => onDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
