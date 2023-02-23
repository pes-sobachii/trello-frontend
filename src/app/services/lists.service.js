import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

axios.defaults.baseURL = API_URL

export const BoardService = {
    async deleteList(id) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/list/${id}`)
    },
    async emptyList(id) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/list-items/${id}`)
    },
    async deleteCard(id) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/card/${id}`)
    },
    async addList(title) {
        await axios.post(`${process.env.REACT_APP_API_URL}/list`, {
					title,
				})
    },
    async getLists() {
        return await axios.get(`${process.env.REACT_APP_API_URL}/lists`)
    },
    async setCard(list, title) {
        await axios.post(`${process.env.REACT_APP_API_URL}/card`, {
					list,
					title,
				})
    },
    async updateCard(id, destinationId, sourceId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/card`, {
					id,
					destinationId,
					sourceId,
				})
    },

}