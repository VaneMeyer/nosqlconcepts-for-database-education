import axios from "axios";

const API_URL = "/api";

export const fetchUserNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user names:", error);
    throw error;
  }
};
export const fetchExercises = async () => {
  try {
    const response = await axios.get(`${API_URL}/getexercises`);
    return response.data;
  } catch (error) {
    console.error("Error fetching  exercises:", error);
    throw error;
  }
};
export const deleteExercise = async (statement_id, area_id) => {
  try {
    const response = await axios.post(`${API_URL}/delete-exercises`, {
      statement_id,
      area_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting exercises:", error);
    throw error;
  }
};
export const addExercise = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/add-exercise`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding exercises:", error);
    throw error;
  }
};
export const updateExercise = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/update-exercises`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating exercises:", error);
    throw error;
  }
};

export const addAssignment = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/add-assignment`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding assignments:", error);
    throw error;
  }
};

export const fetchAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-assignments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

export const deleteAssignment = async (area_id) => {
  try {
    const response = await axios.post(`${API_URL}/delete-assignment`, {
      area_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting assignments:", error);
    throw error;
  }
};
export const updateAssignment = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/update-assignment`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating assignments:", error);
    throw error;
  }
};

export const fetchStatus = async (areaId) => {
  try {
    const response = await axios.post(`${API_URL}/get-status`, { areaId });
    return response.data;
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
};

export const updateNewStatus = async (areaId, checked) => {
  try {
    const response = await axios.post(`${API_URL}/update-status`, {
      areaId,
      checked,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating new status:", error);
    throw error;
  }
};
export const deleteUserData = async (userdata) => {
  try {
    const response = await axios.post(`${API_URL}/delete-userdata`, {
      userdata,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
};
export const deleteAllUserData = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/delete-alluserdata`, {
      username,
    });
    const response2 = await axios.post(`${API_URL}/delete-allhistorydata`, {
      username,
    });
    return (response.data, response2.data);
  } catch (error) {
    console.error("Error deleting all user data:", error);
    throw error;
  }
};

export const fetchUserTaskData = async () => {
  try {
    const response = await axios.get(`${API_URL}/getUserTaskData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user task data:", error);
    throw error;
  }
};
export const fetchHistoryData = async () => {
  try {
    const response = await axios.get(`${API_URL}/getHistoryData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw error;
  }
};