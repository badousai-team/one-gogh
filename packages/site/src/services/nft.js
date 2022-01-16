import { api } from './api'

export const fetchNFTById = (id) => api.get(`/nft/${id}`)
