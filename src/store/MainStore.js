import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
// import 'firebase/firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyCFbbsrNqvgKMnZIkU80NdnciScf1O8a-g",
    authDomain: "react-chat-room-49b49.firebaseapp.com",
    databaseURL: "https://react-chat-room-49b49.firebaseio.com",
    projectId: "react-chat-room-49b49",
    storageBucket: "react-chat-room-49b49.appspot.com",
    messagingSenderId: "401429371084"
} // object containing Firebase config
const rrfConfig = {
    userProfile: 'users',
    presence: 'presence',
    sessions: 'sessions'
} // react-redux-firebase config

// initialize firebase instance
firebase.initializeApp(fbConfig) // <- new to v2.*.*
// firebase.firestore() // <- needed if using firestore

// Add Firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    // firestore: firestoreReducer // <- needed if using firestore
})

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
        // reduxFirestore(firebase) // <- needed if using firestore
        //  applyMiddleware(...middleware) // to add other middleware
    )
)
