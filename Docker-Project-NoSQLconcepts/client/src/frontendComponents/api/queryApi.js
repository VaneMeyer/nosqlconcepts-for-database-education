import axios from 'axios';

const API_URL = '/api';

export const sendToExecute = async (endpoint,  execQuery, taskNumber, taskAreaId, maxPoints_SQL, feedback_on  ) => { //apiRoute anstelle von endpoint
    try {
      const response = await axios.post(`${API_URL}/execute-sql`, {
        endpoint, execQuery, taskNumber, taskAreaId, maxPoints_SQL, feedback_on
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };