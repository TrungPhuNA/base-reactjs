import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    itemCount: 0,
};

// Khôi phục trạng thái giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return initialState;
        }
        const parsedCart = JSON.parse(serializedCart);
        // Đảm bảo parsedCart.items luôn là một mảng
        return {
            ...parsedCart,
            items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
        };
    } catch (e) {
        console.error("Could not load cart from localStorage", e);
        return initialState;
    }
};

const saveCartToLocalStorage = (state) => {
    try {
        const serializedCart = JSON.stringify(state);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            // Đảm bảo state.items luôn là một mảng
            state.items = state.items || [];
            const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingProductIndex >= 0) {
                state.items[existingProductIndex].quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
            }
            state.itemCount += action.payload.quantity;

            // Lưu trạng thái giỏ hàng vào localStorage sau mỗi thay đổi
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items || [];
            const updatedItems = state.items.filter(item => item.id !== action.payload.id);
            state.itemCount -= action.payload.quantity;
            state.items = updatedItems;

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0;

            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
