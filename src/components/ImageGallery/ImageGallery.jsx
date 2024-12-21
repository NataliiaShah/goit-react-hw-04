import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import ImageCard from "../ImageCard/ImageCard";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { nanoid } from 'nanoid';

const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;  // Якщо запит порожній, не робимо запит

    const fetchImages = async () => {
      setLoading(true);
      setError(null);  // Очистити помилку перед новим запитом

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,  // Використовуємо search/photos для пошуку
          {
            params: {
              query: searchQuery,
              page: page,
              per_page: 12,
            },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setHasMore(response.data.results.length === 12);
        setLoading(false);
      } catch (error) {
        setError('Error loading images');
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);  // Завантажувати нові зображення при зміні searchQuery або page

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <ul>
        {images.length > 0 ? (
          images.map((image) => (
            <li key={nanoid()}>
              <ImageCard image={image} />
            </li>
          ))
        ) : (
          <p>No images found</p>
        )}
      </ul>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <ThreeDots height="80" width="80" radius="9" color="blue" visible={true} />
        </div>
      )}

      {hasMore && !loading && (
        <LoadMoreBtn onClick={() => setPage(prevPage => prevPage + 1)} />
      )}
    </div>
  );
};

export default ImageGallery;