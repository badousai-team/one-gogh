import { api } from './api'

export const fetchCreatorByUsername = (username) => api.get(`/creator/${username}`)
export const fetchAllCreator = (query) => api.get('/creator', query)

export const followOtherCreator = (id) => api.put(`/creator/${id}/follow`)
