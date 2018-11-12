import React from 'react'
import {UserListContainer} from '../container/UserListContainer';
import {ChatSpaceContainer} from '../container/ChatSpaceContainer'
export const Home = ({ auth, profile, presence, users }) => {
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
                    <UserListContainer />
                </div>
                <div className={"col-md-7 right-col"}>
                     <ChatSpaceContainer/>
                </div>
            </div>
        </div>
    )
}