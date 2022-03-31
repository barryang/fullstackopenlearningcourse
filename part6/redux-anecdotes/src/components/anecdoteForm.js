import { createAnec } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecForm = () => {
    const dispatch = useDispatch()
    const addAnec = (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        dispatch(createAnec(content))
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div><input name='anec'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecForm