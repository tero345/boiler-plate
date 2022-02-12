import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

// login
export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:4000/login', dataToSubmit).then(response =>  response.data)

    // reducer 로 이동
    return {
        type: LOGIN_USER,
        payload : request
    }
}

// register
export function registerUser(dataToSubmit) {
    const request = axios.post('http://localhost:4000/api/users/register', dataToSubmit).then(response =>  response.data)

    // reducer 로 이동
    return {
        type: REGISTER_USER,
        payload : request
    }
}

// auth
export function auth() {
    const request = axios.get('http://localhost:4000/api/users/auth').then(response =>  response.data)

    // reducer 로 이동
    return {
        type: AUTH_USER,
        payload : request
    }
}