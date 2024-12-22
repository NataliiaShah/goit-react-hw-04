import style from "./ErrorMessage.module.css"

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p className={style.errorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;