/**
 * Import packages
 */
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Configure environment
dotenv.config();

/**
 * Get fetch details
 * @param {string} endpoint example: 'movies'
 * @param {string} queryParams default = ''
 */
const fetchData = async (endpoint, queryParams = '') => {
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.API_KEY}${queryParams}`;

  try {
    const data = await fetch(apiUrl);
    // if (!!data) throw new Error('No data loaded');
    return data;
  } catch (error) {
    console.error(error);
  // }
  }
}

export default fetchData;
