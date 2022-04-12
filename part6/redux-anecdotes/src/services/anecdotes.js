import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anec) => {
    const newanec = {
        content: anec,
        id: getId(),
        votes: 0
      }
    const response = await axios.post(baseUrl, newanec)
    return response.data
}

const update = async (id, anec) => {
    const response = await axios.put(`${baseUrl}/${id}`, anec)
    return response.data
}

export default { getAll, createNew, update }