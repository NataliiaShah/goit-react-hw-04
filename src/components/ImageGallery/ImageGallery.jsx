import { nanoid } from 'nanoid';
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ images, loading, error, openModal, loadMoreImages }) => {

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={style.containerGallery}>
      <ul className={style.gallery}>
        {images.map((image) => (
          <li className={style.galleryItem} key={nanoid()}>
            <ImageCard image={image} onClick={() => openModal(image.urls.full, image.alt_description)} />
          </li>
        ))}
      </ul>

      {loading && <Loader />}

      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
    </div>
  );
};

export default ImageGallery;