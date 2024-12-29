import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from 'react-hot-toast';
import Loader from "../Loader/Loader"; 
import ErrorMessage from "../ErrorMessage/ErrorMessage"; 
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"; 
import { fetchImages } from "../../../src/services/app";
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

  useEffect(() => {
    const loadImages = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const fetchedImages = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
        );
      } catch (error) {
        setError('Помилка завантаження зображень. Спробуйте ще раз.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

 const openModal = useMemo(() => {
    return (imageUrl, imageAlt) => {
      console.log('Open modal called with:', imageUrl, imageAlt);
      if (!selectedImage || selectedImage.imageUrl !== imageUrl) {
        setSelectedImage({ imageUrl, imageAlt });
      }
    };
  }, [selectedImage]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1 className={style.title}>Пошук зображень</h1>
      <SearchBar onSubmit={handleSearchSubmit} />

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      <ImageGallery images={images} openModal={openModal} />

      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      <Toaster />

     
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          closeModal={closeModal}
          imageUrl={selectedImage.imageUrl}
          imageAlt={selectedImage.imageAlt}
        />
      )}

      {showScrollToTop && (
        <button
          className={style.scrollToTopButton}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          &#8593;
        </button>
      )}
    </div>
  );
};

export default App;