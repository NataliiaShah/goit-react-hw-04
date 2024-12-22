import style from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  console.log("Image data:", image);  
  return (
    <div onClick={onClick}>
      <img className={style.galleryImage} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;