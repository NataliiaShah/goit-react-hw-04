import style from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={style.btnThumb}>
      <button className={style.btnLoad} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;