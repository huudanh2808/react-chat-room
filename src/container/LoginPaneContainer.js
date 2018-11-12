
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect} from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional
import { UserIsNotAuthenticated } from '../utils'
import '../css/LoginPane.css';
import {LoginPane} from '../component/LoginPane'

export const LoginPageContainer = compose(
    UserIsNotAuthenticated,
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPane)