import { connect } from "react-redux";
import { createAnec } from '../reducers/anecdoteReducer'
import { changeNot } from "../reducers/notificationReducer";

const AnecForm = (props) => {
    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.createAnec(content)
        props.changeNot(content)
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

const mapDispatchToProps = dispatch => {
    return {
        createAnec: value => {
            dispatch(createAnec(value))
        },
        changeNot: value => {
            dispatch(changeNot(value, 10))
        }
    }
}

const ConnectedAnec = connect(
    null,
    mapDispatchToProps
)(AnecForm)

export default ConnectedAnec