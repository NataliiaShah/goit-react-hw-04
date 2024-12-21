import { Formik, Form, Field } from 'formik';
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <header>
        <Formik 
          initialValues={{ query: "" }} 
          validate={(values) => {
            const errors = {};
            if (!values.query) {
              errors.query = "Please enter a search term to find images."; 
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            if (!values.query.trim()) {
              toast.error("Please enter a search term to find images.");
              actions.setSubmitting(false);
              return;
            }

            onSubmit(values.query); 
            actions.resetForm(); 
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="query"
                value={values.query}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
              {touched.query && errors.query && (
                <div style={{ color: "red" }}>{errors.query}</div> 
              )}
              <button type="submit" disabled={isSubmitting}>Search</button>
            </Form>
          )}
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;

