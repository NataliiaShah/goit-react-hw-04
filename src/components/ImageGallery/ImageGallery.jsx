import { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { FaArrowUp } from 'react-icons/fa'; 

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false); 

  useEffect(() => {
    if (!query) return;

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    const fetchImages = async () => {
      console.log('Завантаження почалося!');
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: query,
            page: page,
            per_page: 12,
            client_id: '2N1SVW6p-h7zTwIX34mVl0ZMU6_-eMpnOii3YhNjMn0',
          },
          cancelToken: source.token,
        });

        if (response.status === 200) {
          setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Запит скасовано:', err.message);
        } else {
          console.error(err);
          setError('Помилка завантаження зображень. Спробуйте ще раз.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Запит скасовано через зміну пошукового запиту.');
      }
    };
  }, [query, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
   
    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
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

      {loading && <Loader />}

      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMoreImages} />}

      
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ImageGallery;