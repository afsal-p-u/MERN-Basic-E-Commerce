import {createSlice} from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: null
    },
    reducers: {
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item=>item._id === action.payload.id), 1
            )
        },
        deleteProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex((item) => item._id === action.payload)] = action.payload.product;
        },
        updateProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload)
        },
        addProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    }
})

export const {
    getProductStart, 
    getProductSuccess, 
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;