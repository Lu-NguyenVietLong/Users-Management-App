import { AxiosPromise, AxiosResponse } from "axios";
import axios from "./axiosCustom";




export const fetchAllUser = (page: number) => {
    return axios.get(`api/users?page=${page}`)
}

export const postCreateUser = (name: string, job: string) => {
    return axios.post('api/users', {name, job})
}

export const putUpdateUser = (name: string, job: string, id: number) => {
    return axios.put(`api/users/${id}`, {name, job})
}

export const deleteUser = (id: number) => {
    return axios.delete(`api/users/${id}`);
}

export const loginApi = (email: string, password: string) => {
    return axios.post(`api/login`, {email, password})
}
