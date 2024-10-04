import axios from 'axios';

const API_KEY = 'pn2ByUA60ibdKfynTm72cKlUVSHrgst4djyFOoRq';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export const fetchNearEarthObjects = async () => {
  const response = await axios.get(`${BASE_URL}/neo/browse?api_key=${API_KEY}`);
  return response.data.near_earth_objects;
};
