import React from 'react'
import PropTypes from 'prop-types'
// import GoogleButton from 'react-google-button' // optional
import GoogleButton from 'react-google-button';
import '../css/LoginPane.css';

export const LoginPane = ({ firebase, auth }) => (
    <div className={'fluid-container'}>
        <div className={'greeting'}>Welcome to <span className={'app-name'}>WonderSpace</span></div>
        <div className={'login-btn-container'}>
            <GoogleButton className={'login-btn'}
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}>
            </GoogleButton>
        </div>
    </div>
)

LoginPane.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}
