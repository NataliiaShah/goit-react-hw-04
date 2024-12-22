import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import style from "./SearchBar.module.css";

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
    <header className={style.searchHeader}>
      <form onSubmit={formik.handleSubmit}>
        <input
          className={style.inputSearch}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={formik.values.query}
          onChange={formik.handleChange}
        />
        <button className={style.btnSearch} type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;

