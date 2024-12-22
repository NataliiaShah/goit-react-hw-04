import Modal from 'react-modal';
import style from "./ImageModal.module.css";


Modal.setAppElement('#root');

const ImageModal = ({ isOpen, closeModal, imageUrl, imageAlt }) => {
  console.log('isOpen:', isOpen, 'imageUrl:', imageUrl, 'imageAlt:', imageAlt);   

  return (
    <Modal
      className={style.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false} 
      shouldCloseOnOverlayClick={true} 
      onKeyDown={(e) => e.key === 'Escape' && closeModal()}>
      <div className={style.containerModal}>
        {imageUrl ? (
          <img className={style.image} src={imageUrl} alt={imageAlt} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <p className={style.missing}>Зображення не доступне.</p>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;