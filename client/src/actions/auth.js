import * as api from '../api'
import { setCurrentUser } from './currentUser.js'
import { fetchAllUsers } from "./users";
import {  showToast } from '../Toast/toast.js'

export const signup = (authData , navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(authData)
        dispatch({ type: 'AUTH' , data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        dispatch(fetchAllUsers());
        navigate('/')
        showToast("Your account has been successfully created.")
    } catch (error) {
        console.log(error)
    }
}

export const login = (authData , navigate) => async (dispatch) => {
    try {
        const {data} = await api.logIn(authData)
        dispatch({type:'AUTH' , data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
        showToast("Welcome back! You have successfully logged in.")
    } catch (error) {
        console.log(error)
    }
}