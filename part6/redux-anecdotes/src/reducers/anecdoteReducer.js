import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anec',
  initialState: [],
  reducers: {
    add_anec(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action) {
      return action.payload
    }
  },
}) 

export const { add_anec, setAnec } = anecSlice.actions

export const initializeAnec = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    anecs.sort(( a, b) => b.votes - a.votes)
    dispatch(setAnec(anecs))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newanec = await anecService.createNew(content)
    dispatch(add_anec(newanec))
  }
}

export const updateAnec = (id) => {
  return async dispatch => {
    const state = await anecService.getAll()
    const idToVote = state.find(n => n.id === id)
    const votedAnec = {
      ...idToVote,
      votes: idToVote.votes + 1,
    }
    const voteAnec = await anecService.update(id, votedAnec)
    console.log(voteAnec)
    const newstate = state.map(anec => 
      anec.id !== id ? anec : voteAnec
    )
    newstate.sort(( a, b) => b.votes - a.votes)
    dispatch(setAnec(newstate))
  }
}

export default anecSlice.reducer