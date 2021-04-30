import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertData = payload => api.post(`/insert`, payload)
export const getAllEmpData = () => api.get(`/getAllEmpData`)
export const getEmpDataById = id => api.get(`/getEmpDataById/${id}`)
export const getEmpDataByName = name => api.get(`/getEmpDataByName/${name}`)
export const getSortedAge = filter => api.get(`/getSortedAge/${filter}`)
export const getNextPageStack = page => api.get(`/getNextPageStack/${page}`)
export const getPrevPageStack = page => api.get(`/getPrevPageStack/${page}`)




const apis = {
    insertData,
    getAllEmpData,
    getEmpDataById,
    getEmpDataByName,
    getSortedAge,
    getNextPageStack,
    getPrevPageStack
}

export default apis