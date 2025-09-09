import { useState } from 'react';
import styles from './CartHeader.module.css';
import ConfirmationModal from './common/ConfirmationModal';

const CartHeader = ({ isAllSelected, toggleAllItems, removeSelectedItems, selectedItems }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelectAll = (e) => {
    toggleAllItems(e.target.checked);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    removeSelectedItems();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.selectAll}>
          <input
            type="checkbox"
            id="selectAll"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className={styles.checkbox}
          />
          <label htmlFor="selectAll" className={styles.label}>
            전체 선택
          </label>
        </div>
        <button
          className={styles.deleteButton}
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
        >
          선택 삭제
        </button>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        message="선택한 상품을 삭제하시겠습니까?"
      />
    </>
  );
};

export default CartHeader;