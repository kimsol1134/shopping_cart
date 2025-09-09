import styles from './OrderSummary.module.css';
import { FREE_SHIPPING_THRESHOLD } from '../constants/cart';

const OrderSummary = ({ subtotal, shippingFee, totalAmount, selectedItems }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) return;
    alert('주문이 완료되었습니다!');
  };

  const isOrderDisabled = selectedItems.length === 0;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const showFreeShippingMessage = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>주문 요약</h2>
      
      <div className={styles.summaryContent}>
        {showFreeShippingMessage && (
          <div className={styles.freeShippingMessage}>
            {formatPrice(remainingForFreeShipping)} 더 주문하시면 무료 배송!
          </div>
        )}
        
        <div className={styles.summaryRow}>
          <span className={styles.label}>상품 금액</span>
          <span className={styles.value}>{formatPrice(subtotal)}</span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.label}>배송비</span>
          <span className={`${styles.value} ${shippingFee === 0 && subtotal > 0 ? styles.free : ''}`}>
            {shippingFee === 0 && subtotal > 0 ? '무료' : formatPrice(shippingFee)}
          </span>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span className={styles.label}>총 결제 금액</span>
          <span className={styles.value}>{formatPrice(totalAmount)}</span>
        </div>
      </div>
      
      <button
        className={`${styles.orderButton} ${isOrderDisabled ? styles.disabled : ''}`}
        onClick={handleOrder}
        disabled={isOrderDisabled}
      >
        주문하기 ({selectedItems.length}개)
      </button>
    </div>
  );
};

export default OrderSummary;