import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNot(state, action) {
            return action.payload
        },
        clearNot(state, action) {
            return ''
        }
    },
})

let timeoutID = undefined

export const { setNot, clearNot } = notSlice.actions

export const changeNot = (not, time) => {
    return dispatch => {
        dispatch(setNot(not))
        if (typeof timeoutID === 'number') {
            console.log('timeid cleared')
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch(clearNot)
        }, time*1000)
    }
}

export default notSlice.reducer