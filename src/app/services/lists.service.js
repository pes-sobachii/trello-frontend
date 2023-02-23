import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

axios.defaults.baseURL = API_URL

export const BoardService = {
    async deleteList(id) {
        await axios.delete(`/list/${id}`);
    },
    async emptyList(id) {
        await axios.delete(`/list-items/${id}`);
    },
    async deleteCard(id) {
        await axios.delete(`/card/${id}`);
    },
    async addList(title) {
        await axios.post(`/list`, {
            title
        });
    },
    async getLists() {
        return await axios.get(`/lists`);
    },
    async setCard(list, title) {
        await axios.post(`/card`, {
            list, title
        })
    },
    async updateCard(id, destinationId, sourceId) {
        await axios.put(`/card`, {
            id, destinationId, sourceId
        })
    },

}