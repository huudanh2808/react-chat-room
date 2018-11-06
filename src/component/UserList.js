import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/UserList.css'
import UserInUserList from './UserInUserList';
import { BeatLoader } from 'react-spinners';

const UserList = ({ presence, users }) => {
    const userList = !isLoaded(users) ? <BeatLoader />
        : isEmpty(users) ? 'User list is empty'
            : users.map((data, id) =>
                <UserInUserList id={id} user={data} isOnline={presence.find(p => p.key === data.key) != undefined} />
            );
    return (
        <div className="user-list-container">
            {userList}
        </div>
    )
}
export default compose(
    firebaseConnect(["presence", "users"]),
    connect(({ firebase: { ordered } }) => ({
        presence: ordered.presence,
        users: ordered.users,
    }))
)(UserList) 