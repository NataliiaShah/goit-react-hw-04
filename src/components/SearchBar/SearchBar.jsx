import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (!values.searchQuery.trim()) {
      toast.error('Please enter a search term.');
    } else {
      onSubmit(values.searchQuery);  // Передаємо запит в батьківський компонент
      resetForm();
    }
  };

  return (
    <header>
      <Formik
        initialValues={{ searchQuery: '' }}
        onSubmit={handleSubmit}
      >
        <Form id={nanoid()}>
          <Field
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;