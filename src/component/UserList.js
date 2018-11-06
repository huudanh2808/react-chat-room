import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/UserList.css'
import { BeatLoader } from 'react-spinners';
import User from './UserInUserList';

const UserList = ({ presence, users, profile }) => {
    const userList = !isLoaded(users) && !isLoaded(profile) ? <BeatLoader />
        : isEmpty(users) ? 'User list is empty'
            : users.map((data, id) => {
                console.log(profile);
                if(data.value.providerData[0].uid === profile.providerData[0].uid){
                    return;
                }
                return <User id={id} user={data} isOnline={presence.find(p => p.key === data.key) != undefined} />
            });
    return (
        <div className="user-list-container">
            {userList}
        </div>
    )
}
export default compose(
    firebaseConnect(["presence", "users"]),
    connect(({ firebase: { ordered, profile } }) => ({
        presence: ordered.presence,
        users: ordered.users,
        profile: profile
    }))
)(UserList) 