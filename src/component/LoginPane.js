import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional
import { UserIsNotAuthenticated } from '../utils'
import GoogleButton from 'react-google-button';
import '../css/LoginPane.css';

export const LoginPage = ({ firebase, auth }) => (
    <div className={'fluid-container'}>
        <div className={'greeting'}>Welcome to <span className={'app-name'}>WonderSpace</span></div>
        <div className={'login-btn-container'}>
            <GoogleButton className={'login-btn'}
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}>
            </GoogleButton>
        </div>
    </div>
)

LoginPage.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}

export default compose(
    UserIsNotAuthenticated,
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)