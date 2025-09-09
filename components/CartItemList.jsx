import styles from './CartItemList.module.css';
import CartItem from './CartItem';

const CartItemList = ({ cartItems, toggleItem, updateQuantity, removeItem }) => {
  return (
    <div className={styles.itemList}>
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          toggleItem={toggleItem}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default CartItemList;