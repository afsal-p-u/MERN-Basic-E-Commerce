import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    await publicRequest.post('/user/login', user).then((res) => {
        dispatch(loginSuccess(res.data))
    }).catch((err) => {
        dispatch(loginFailure(err.response.data))
    })
}