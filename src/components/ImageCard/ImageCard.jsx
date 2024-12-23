import style from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  console.log("Image data:", image);  
  return (
      <img
        className={style.galleryImage}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onClick}/>
    
  );
};

export default ImageCard;