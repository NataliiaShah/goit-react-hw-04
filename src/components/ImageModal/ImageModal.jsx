import { useEffect } from 'react';
import Modal from 'react-modal';

// Встановлюємо модальне вікно в DOM
Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {

  // Закриваємо модалку, якщо натискаємо ESC
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      closeTimeoutMS={200}
    >
      <button onClick={onClose}>×</button>
      {image && (
        <img src={image.urls.full} alt={image.alt_description} className="modal-image" />
      )}
    </Modal>
  );
};

export default ImageModal;