import { useEffect } from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, closeModal, image }) => {
  useEffect(() => {
    // Функція для закриття модалки при натисканні ESC
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // Очистка прослуховувача події при розмонтуванні
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      ariaHideApp={false} // Для використання без стандартної помилки React Modal
      className="modal"
      overlayClassName="overlay"
    >
      <div >
        <button  onClick={closeModal}>
          &times;
        </button>
        <img src={image?.urls?.full} alt={image?.alt_description}/>
      </div>
    </Modal>
  );
};

export default ImageModal;