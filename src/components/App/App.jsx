import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import style from "./App.module.css";


const App = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <h1 className={style.titel}>Пошук зображень</h1>
      <SearchBar onSubmit={handleSearchSubmit}/>
      <ImageGallery query={query}/>
      <Toaster className={style.toastTextCenter} />
    </div>
  );
};

export default App;
