import AnecForm from './components/anecdoteForm'
import Anecdotes from './components/anecdoteList'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnec } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnec())
  },[dispatch])

  return (
    <div>
      <Anecdotes />
      <AnecForm />
    </div>
  )
}

export default App