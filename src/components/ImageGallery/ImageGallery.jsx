import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  
  const imageItems = useMemo(() => {
    return images.map((image) => (
      <li className={style.galleryItem} key={nanoid()}>
        <ImageCard
          image={image}
          onClick={() => openModal(image.urls.full, image.alt_description)}
        />
      </li>
    ));
  }, [images, openModal]); 

  return (
    <div className={style.containerGallery}>
      <ul className={style.gallery}>
        {imageItems}
      </ul>
    </div>
  );
};

export default ImageGallery;