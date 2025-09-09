import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onClose}
            >
              취소
            </button>
            <button 
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={onConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;