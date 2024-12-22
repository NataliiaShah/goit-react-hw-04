import { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { FaArrowUp } from 'react-icons/fa'; 
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";


  const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  
  const fetchImages = async () => {
    if (!query) return;

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
      });

      if (response.status === 200) {
        
        setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));
      }
    } catch (err) {
      setError('Помилка завантаження зображень. Спробуйте ще раз.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    
    if (query) {
      setImages([]); 
      setPage(1); 
    }
  }, [query]); 

  
  useEffect(() => {
    fetchImages(); 
  }, [query, page]);
  
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1); 
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

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
          onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ImageGallery;