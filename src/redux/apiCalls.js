import {publicRequest, userRequest} from '../utils/requestMethods';
import { 
    addProductFailure,
    addProductStart,
    addProductSuccess,
    deleteProductFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    getProductFailure, 
    getProductStart, 
    getProductSuccess, 
    updateProductFailure,
    updateProductStart,
    updateProductSuccess
} from './productRedux';
import { loginFailure, loginStart, loginSuccess } from './userRedux';


export const login = async (dispatch, user) => {
    dispatch(loginStart())
    await userRequest.post('/user/login', user).then((res) => {
        dispatch(loginSuccess(res.data))
    }).catch((err) => {
        dispatch(loginFailure(err.response.data))
    })
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    await publicRequest.get('/products').then((res) => {
        dispatch(getProductSuccess(res.data))
    }).catch((err) => {
        dispatch(getProductFailure(err.response.data))
    })
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    await userRequest.get(`/products/${id}`).then((res) => {
        
        dispatch(deleteProductSuccess(id))
    }).catch((err) => {
        dispatch(deleteProductFailure(err.response.data))
    })
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    // update
    await userRequest.put(`/products/${id}`).then((res) => {
        
        dispatch(updateProductSuccess({id: id, product}))
    }).catch((err) => {
        dispatch(updateProductFailure(err.response.data))
    })
}
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    await userRequest.post(`/products`, product).then((res) => {
        
        dispatch(addProductSuccess(res.data))
    }).catch((err) => {
        dispatch(addProductFailure(err.response.data))
    })
}