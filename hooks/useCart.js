import { useState, useEffect, useMemo } from 'react';
import storageManager from '../utils/localStorageManager';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, LOCAL_STORAGE_KEY } from '../constants/cart';

const DUMMY_DATA = [
  { 
    id: 1, 
    name: '무선 블루투스 헤드폰', 
    price: 89000, 
    imageUrl: 'https://placehold.co/100x100/EFEFEF/333?text=Product', 
    quantity: 1, 
    selected: true 
  },
  { 
    id: 2, 
    name: '스마트워치', 
    price: 199000, 
    imageUrl: 'https://placehold.co/100x100/EFEFEF/333?text=Product', 
    quantity: 1, 
    selected: false 
  },
  { 
    id: 3, 
    name: 'USB-C 충전 케이블', 
    price: 15000, 
    imageUrl: 'https://placehold.co/100x100/EFEFEF/333?text=Product', 
    quantity: 2, 
    selected: true 
  }
];

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Initial data loading
  useEffect(() => {
    const savedItems = storageManager.get(LOCAL_STORAGE_KEY);
    if (savedItems) {
      setCartItems(savedItems);
    } else {
      setCartItems(DUMMY_DATA);
      storageManager.set(LOCAL_STORAGE_KEY, DUMMY_DATA);
    }
  }, []);

  // Data persistence
  useEffect(() => {
    if (cartItems.length > 0) {
      storageManager.set(LOCAL_STORAGE_KEY, cartItems);
    }
  }, [cartItems]);

  // Derived state calculations
  const selectedItems = useMemo(() => 
    cartItems.filter(item => item.selected), 
    [cartItems]
  );

  const subtotal = useMemo(() => 
    selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [selectedItems]
  );

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  }, [subtotal]);

  const totalAmount = useMemo(() => 
    subtotal + shippingFee, 
    [subtotal, shippingFee]
  );

  const isAllSelected = useMemo(() => 
    cartItems.length > 0 && selectedItems.length === cartItems.length, 
    [cartItems.length, selectedItems.length]
  );

  // Action functions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleItem = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleAllItems = (checked) => {
    setCartItems(prevItems => 
      prevItems.map(item => ({ ...item, selected: checked }))
    );
  };

  const removeSelectedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !item.selected));
  };

  return {
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
  };
};

export default useCart;