import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageCard from "../ImageCard/ImageCard";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {

    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    };
    
    return (
        <>
             
            <SearchBar onSubmit={handleSearchSubmit} />
            <Toaster position="top-center" /> 
            <h2>Search results for: {searchQuery}</h2>
      
            <ErrorMessage />;
            <ImageCard />;
            <ImageGallery />;
            <ImageModal />;
            <Loader />;
            <LoadMoreBtn />;
        </>
    );
};

export default App;