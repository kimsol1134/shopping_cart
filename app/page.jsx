"use client";

import styles from './page.module.css';
import useCart from '../hooks/useCart';
import CartHeader from '../components/CartHeader';
import CartItemList from '../components/CartItemList';
import OrderSummary from '../components/OrderSummary';

const HomePage = () => {
  const {
    cartItems,
    selectedItems,
    subtotal,
    shippingFee,
    totalAmount,
    isAllSelected,
    updateQuantity,
    toggleItem,
    removeItem,
    toggleAllItems,
    removeSelectedItems
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <h1>장바구니</h1>
          <p>장바구니가 비어있습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>장바구니</h1>
      </div>
      
      <div className={styles.content}>
        <div className={styles.cartSection}>
          <CartHeader
            isAllSelected={isAllSelected}
            toggleAllItems={toggleAllItems}
            removeSelectedItems={removeSelectedItems}
            selectedItems={selectedItems}
          />
          <CartItemList
            cartItems={cartItems}
            toggleItem={toggleItem}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>
        
        <div className={styles.summarySection}>
          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
            selectedItems={selectedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;