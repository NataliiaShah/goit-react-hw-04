const ImageCard = ({ image }) => {
  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description || 'Image'} />
      <p>{image.description || 'No description'}</p>
    </div>
  );
};

export default ImageCard;