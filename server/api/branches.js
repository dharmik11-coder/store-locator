import axios from 'axios';
import { getQuery } from 'h3';

export default async (event) => {
  const query = getQuery(event).query; // Get the query parameter from the request URL
  const apiUrl = 'https://www.amscot.com/handlers/pinsNearestAms.ashx';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        lat1: 27.988,
        lon1: -82.56,
        range: 200000,
        query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data in proxy:', error.message);
    return { error: 'Error fetching data' };
  }
};