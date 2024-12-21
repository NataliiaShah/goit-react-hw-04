const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;