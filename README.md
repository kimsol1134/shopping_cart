# Shopping Cart Implementation

A comprehensive shopping cart page built with Next.js (App Router) and CSS Modules, featuring client-side rendering and localStorage persistence.

## Project Structure

```
shopping_cart/
├── app/
│   ├── page.jsx                    # Main cart page (client component)
│   ├── page.module.css            # Main page styles
│   └── layout.jsx                 # Root layout
├── components/
│   ├── common/
│   │   ├── ConfirmationModal.jsx  # Reusable confirmation modal
│   │   └── ConfirmationModal.module.css
│   ├── CartHeader.jsx             # Select all & delete controls
│   ├── CartHeader.module.css
│   ├── CartItem.jsx               # Individual cart item
│   ├── CartItem.module.css
│   ├── CartItemList.jsx           # List of cart items
│   ├── CartItemList.module.css
│   ├── OrderSummary.jsx           # Order summary & checkout
│   └── OrderSummary.module.css
├── constants/
│   └── cart.js                    # Cart constants (shipping, thresholds)
├── hooks/
│   └── useCart.js                 # Custom cart state management hook
└── utils/
    └── localStorageManager.js     # Safe localStorage operations
```

## Features

### Core Functionality
- **Client-Side Rendering**: Uses `"use client"` directive for localStorage access
- **State Management**: Custom `useCart` hook with React's built-in hooks only
- **Data Persistence**: All cart data persists in localStorage
- **Responsive Design**: Desktop and mobile layouts (breakpoint: 768px)

### Cart Operations
- Add/remove items from cart
- Update item quantities (minimum 1)
- Select/deselect individual items
- Select/deselect all items
- Delete selected items with confirmation

### Pricing & Shipping
- Real-time subtotal calculation
- Free shipping over ₩50,000
- ₩3,000 shipping fee below threshold
- Free shipping indicator and progress

### UI Components
- Confirmation modals for destructive actions
- Sticky order summary on desktop
- Responsive mobile layout
- Loading states and disabled states

## Technical Implementation

### Custom Hook (useCart)
```javascript
const {
  cartItems,           // Array of cart items
  selectedItems,       // Filtered selected items
  subtotal,           // Sum of selected items
  shippingFee,        // Calculated shipping cost
  totalAmount,        // Subtotal + shipping
  isAllSelected,      // Boolean for select all state
  updateQuantity,     // Update item quantity
  toggleItem,         // Toggle item selection
  removeItem,         // Remove single item
  toggleAllItems,     // Select/deselect all
  removeSelectedItems // Remove all selected items
} = useCart();
```

### localStorage Integration
- Automatic data loading on mount
- Real-time persistence on state changes
- Error handling for localStorage operations
- Initial dummy data if no saved data exists

### Responsive Design
- **Desktop (>768px)**: Two-column layout with sticky summary
- **Mobile (≤768px)**: Stacked layout with summary below items
- Adaptive font sizes and spacing
- Touch-friendly buttons and controls

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
npm start
```

## Initial Data

The cart initializes with 3 demo products:
- 무선 블루투스 헤드폰 (₩89,000) - Selected
- 스마트워치 (₩199,000) - Not selected  
- USB-C 충전 케이블 (₩15,000 x2) - Selected

## Browser Compatibility

- Modern browsers supporting ES6+ and localStorage
- Mobile browsers (iOS Safari, Android Chrome)
- Desktop browsers (Chrome, Firefox, Safari, Edge)