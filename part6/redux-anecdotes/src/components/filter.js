import { connect } from "react-redux"

const Filter = (props) => {

    const handleChange = (event) => {
        props.changeFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }
    
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeFilter: value => {
            dispatch({ type: 'filter/changeFilter', payload: value })
        },
    }
}

const ConnectedAnec = connect(
    null,
    mapDispatchToProps
    )(Filter)

export default ConnectedAnec