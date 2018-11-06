import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import UserList from './UserList';
import ChatSpace from './ChatSpace'
const Home = ({ auth, profile, presence, users }) => {
    return (
        <div>
            <nav className={"navbar sticky-top navbar-dark bg-dark justify-content-between"}>
                <div className={"navbar-brand"}>Wonder space</div>
                <div className={"row user-info-wrapper"}>
                    <div className={"user-name"}>Hello</div>
                    <img className={"user-avt"} src={profile.avatarUrl} alt="" />
                    <div className={"user-name"}>{auth.displayName}</div>
                </div>
            </nav>
            <div className={"container row main-container"}>
                <div className={"col-md-4 left-col"}>
                    <UserList />
                </div>
                <div className={"col-md-7 right-col"}>
                     <ChatSpace/>
                </div>
            </div>
        </div>
    )
}
export default compose(
    firebaseConnect(["presence", "users"]),
    connect(({ firebase: { auth, profile, ordered } }) => ({
        presence: ordered.presence,
        users: ordered.users,
        auth,
        profile
    }))
)(Home)