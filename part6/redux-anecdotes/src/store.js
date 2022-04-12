import { configureStore } from '@reduxjs/toolkit'

import anecReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'
import filReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anec: anecReducer,
        not: notReducer,
        filter: filReducer,
    } 
})

export default store