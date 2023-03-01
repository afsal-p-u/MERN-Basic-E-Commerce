import axios from 'axios'
import {store} from './redux/store'

const BASE_URL = process.env.REACT_APP_URL
const TOKEN = store.getState().user.currentUser?.accessToken || process.env.REACT_APP_TOKEN


export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL, 
    header: {token: `Bearer ${TOKEN}`}
})