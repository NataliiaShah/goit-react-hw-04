import { useState, useEffect } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import style from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);  
  const [showScrollToTop, setShowScrollToTop] = useState(false); 

  
  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1); 
  };

  const fetchImages = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          page: page,
          per_page: 12,
          client_id: '2N1SVW6p-h7zTwIX34mVl0ZMU6_-eMpnOii3YhNjMn0',  
        },
      });

      if (response.status === 200) {
        setImages((prevImages) =>
          page === 1 ? response.data.results : [...prevImages, ...response.data.results]
        );
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
      fetchImages();
    }
  }, [query, page]);  

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  }

  
  const openModal = (imageUrl, imageAlt) => {
    setSelectedImage({ imageUrl, imageAlt });
  };

  
  const closeModal = () => {
    setSelectedImage(null);
  };

  
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1 className={style.title}>Пошук зображень</h1>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery 
        images={images} 
        loading={loading} 
        error={error} 
        openModal={openModal}  
        loadMoreImages={loadMoreImages}  
      />
      <Toaster className={style.toastTextCenter} />

     
      {selectedImage && (
        <ImageModal
          isOpen={true}
          closeModal={closeModal}
          imageUrl={selectedImage.imageUrl}
          imageAlt={selectedImage.imageAlt}
        />
      )}

      {showScrollToTop && (
        <button className={style.scrollToTopButton} onClick={scrollToTop}>
          &#8593; 
        </button>
      )}
    </div>
  );
};

export default App;