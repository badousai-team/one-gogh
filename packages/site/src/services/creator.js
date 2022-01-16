import { api } from './api'

export const fetchCreatorByUsername = (username) => api.get(`/creator/${username}`)
export const followOtherCreator = (id) => api.put(`/creator/${id}/follow`)
