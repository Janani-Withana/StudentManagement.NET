import axios from 'axios';

const API_URL = "https://localhost:7016/api/student"; // Replace with your actual API URL

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetStudent`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    const response = await axios.post(`${API_URL}/AddStudent`, student);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await axios.patch(`${API_URL}/UpdateStudent/${id}`, student);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_URL}/DeleteStudent/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    return false;
  }
};
