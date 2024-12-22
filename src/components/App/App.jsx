import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';


const App = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <h1>Пошук зображень</h1>
      <SearchBar onSubmit={handleSearchSubmit}/>
      <ImageGallery query={query}/>
      <Toaster/>
    </div>
  );
};

export default App;
