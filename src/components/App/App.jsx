import { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';

const App = () => {
  const handleSearchSubmit = (query) => {
    console.log('Search query submitted:', query);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster /> 
    </div>
  );
};

export default App;