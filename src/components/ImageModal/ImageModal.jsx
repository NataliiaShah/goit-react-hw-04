import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, closeModal, imageUrl, imageAlt }) => {
  console.log('isOpen:', isOpen, 'imageUrl:', imageUrl, 'imageAlt:', imageAlt); 

  return (
    <Modal
      iisOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false} 
      shouldCloseOnOverlayClick={true} 
      onKeyDown={(e) => e.key === 'Escape' && closeModal()} 
    >
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <p>Зображення не доступне.</p>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;