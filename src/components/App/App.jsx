
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";

const App = () => {
  const [query, setQuery] = useState('');  // Додаємо стейт для запиту

  const handleSearchSubmit = (query) => {
    setQuery(query);  // Оновлюємо запит пошуку
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSearchSubmit} />
        <Toaster />
      </div>
      <div>
        <h1>Image Gallery</h1>
        <ImageGallery searchQuery={query} />  {/* Переходимо передавати запит сюди */}
      </div>
    </>
  );
};

export default App;