
  const ImageCard = ({ image }) => {
  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description || 'image'} />
    </div>
  );
};

export default ImageCard;