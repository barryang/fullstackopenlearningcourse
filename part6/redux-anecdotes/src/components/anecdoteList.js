import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import Filter from "./filter";
import { updateAnec } from "../reducers/anecdoteReducer";
import { changeNot } from "../reducers/notificationReducer";


const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
            return state.anec
        }
        return state.anec.filter(anec => anec.content.includes(state.filter))
    })
    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(updateAnec(id))
        dispatch(changeNot(content, 5))
    }
    
    return(
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes