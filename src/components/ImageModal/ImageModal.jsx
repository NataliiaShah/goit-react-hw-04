import Modal from 'react-modal';

// Встановлюємо елемент для доступності
Modal.setAppElement('#root');

// Стилі для модального вікна
const modalStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // темний фон за межами модалки
  },
};

const ImageModal = ({ isOpen, closeModal, imageUrl, imageAlt }) => {
  console.log('isOpen:', isOpen, 'imageUrl:', imageUrl, 'imageAlt:', imageAlt);  // Лог для перевірки пропсів

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false} // Вимикає warning при використанні React Modal
      shouldCloseOnOverlayClick={true} // Закриття при кліку за межами
      onKeyDown={(e) => e.key === 'Escape' && closeModal()} // Закриття при натисканні ESC
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