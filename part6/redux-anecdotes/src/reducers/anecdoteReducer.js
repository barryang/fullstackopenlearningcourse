const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnec = (content) => {
  return {
    type: 'ADD_ANEC',
    data: { content }
  }
}

export const voteAnec = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
} 

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const idToVote = state.find(n => n.id === id)
      const votedAnec = {
        ...idToVote,
        votes: idToVote.votes + 1,
      }
      const newstate = state.map(anec => 
        anec.id !== id ? anec : votedAnec
      )
      
      newstate.sort(( a, b) => b.votes - a.votes)

      return newstate
    }
    case 'ADD_ANEC': {
      const annec = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return [...state, annec]
    }
    default:
      return state
  }
}

export default reducer