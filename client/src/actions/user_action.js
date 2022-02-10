import axios from 'axios';
import {
    LOGIN_USER
} from './types'

export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:4000/login', dataToSubmit).then(response =>  response.data)

    // reducer 로 이동
    return {
        type: LOGIN_USER,
        payload : request
    }
}