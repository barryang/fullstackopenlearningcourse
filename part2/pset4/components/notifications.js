import React from 'react';

const Notify = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <div className={message.positive ? 'notify' : 'error'}>
            {message.message}
        </div>
    )
}

export default Notify;