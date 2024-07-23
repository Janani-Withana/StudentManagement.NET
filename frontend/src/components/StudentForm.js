import React, { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../api/StudentApi'; // Update import path if necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = ({ refreshStudents, selectedStudent, setSelectedStudent }) => {
  const initialFormState = { stname: '', course: '' }; // Adjusted fields based on your API
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    } else {
      setFormData(initialFormState);
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudent(selectedStudent.id, formData)
        .then((res) => {
          toast.success('Student updated successfully!');
          setFormData(initialFormState);
          setSelectedStudent(null);
          refreshStudents();
        })
        .catch((err) => {
          toast.error('Failed to update student.');
          console.error(err);
        });
    } else {
      addStudent(formData)
        .then((res) => {
          toast.success('Student added successfully!');
          setFormData(initialFormState);
          refreshStudents();
        })
        .catch((err) => {
          toast.error('Failed to add student.');
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-5">
        {selectedStudent ? 'Edit Student' : 'Add New Student'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student</label>
          <input
            type="text"
            name="stname"
            value={formData.stname}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
          >
            {selectedStudent ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
