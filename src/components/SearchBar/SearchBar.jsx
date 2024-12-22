import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  
  const formik = useFormik({
    initialValues: {
      query: ''
    },
    onSubmit: (values) => {
      if (!values.query.trim()) {
        toast.error('Будь ласка, введіть текст для пошуку зображень.');
      } else {
        onSubmit(values.query);
      }
    }
  });

  return (
    <header>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={formik.values.query}
          onChange={formik.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;

