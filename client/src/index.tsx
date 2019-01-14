import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import petReducer from './reducers/petReducer'
import thunk from 'redux-thunk'

// Create the store and apply thunk
const store = createStore(petReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));