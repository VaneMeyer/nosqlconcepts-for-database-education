import axios from "axios";

const API_URL = "/api";

export const fetchAreaNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/area-names`);
    return response.data.map((area) => ({
      area_id: area.area_id,
      area_name: area.area_name,
    }));
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};



export const fetchTasksData = async (areaId) => {
  try {
    const response = await axios.post(`${API_URL}/getTasks`, {
      areaId,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const fetchDbStructure = async (dbendpoint) => {
  try {
    const response = await axios.get(`${API_URL}${dbendpoint}`);
    return response;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};




