import axios from 'axios';
import { UNSPLASH_API_KEY } from '../images-api';

const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: UNSPLASH_API_KEY
      },
    });

    if (response.status === 200) {
      return response.data.results;
    }

    throw new Error('Помилка отримання даних');
  } catch (error) {
    console.error('Fetch Images Error:', error);
    throw error;
  }
};