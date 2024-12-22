import { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ImageCard from '../ImageCard/ImageCard';
import Loader from '../Loader/Loader';

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      console.log('Завантаження почалося!');
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: query,
            per_page: 12,
            client_id: '2N1SVW6p-h7zTwIX34mVl0ZMU6_-eMpnOii3YhNjMn0'
          }
        });

        setImages(response.data.results);
      } catch (err) {
        console.error(err); 
        setError('Помилка завантаження зображень.');
      } finally {
          setLoading(false);
          console.log('Завантаження завершено!');
      }
    };

    fetchImages();
  }, [query]);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (images.length === 0) {
    return <p>Нічого не знайдено за запитом: {query}</p>;
  }

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={nanoid()}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
      {loading && <Loader/>}
    </div>
  );
};

export default ImageGallery;