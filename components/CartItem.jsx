import { useState } from 'react';
import styles from './CartItem.module.css';
import ConfirmationModal from './common/ConfirmationModal';

const CartItem = ({ item, toggleItem, updateQuantity, removeItem }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCheckboxChange = () => {
    toggleItem(item.id);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    removeItem(item.id);
    setShowDeleteModal(false);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.selectSection}>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
        </div>

        <div className={styles.imageSection}>
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.productName}>{item.name}</h3>
          <p className={styles.productPrice}>{formatPrice(item.price)}</p>
        </div>

        <div className={styles.quantitySection}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>

        <div className={styles.totalSection}>
          <p className={styles.totalPrice}>
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className={styles.actionSection}>
          <button
            className={styles.deleteButton}
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        message={`"${item.name}"을(를) 삭제하시겠습니까?`}
      />
    </>
  );
};

export default CartItem;