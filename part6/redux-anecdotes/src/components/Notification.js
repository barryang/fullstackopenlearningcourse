import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.not === '') {
    return null
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.not}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    not: state.not
  }
}

const ConnectedAnec = connect(mapStateToProps)(Notification)

export default ConnectedAnec