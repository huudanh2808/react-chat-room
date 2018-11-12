import React from 'react'
import {isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/UserList.css'
import { BeatLoader } from 'react-spinners';
import {User} from '../container/UserInUserListContainer';

export const UserList = ({ presence, users, profile }) => {
    const userList = !isLoaded(users) && !isLoaded(profile) ? <BeatLoader />
        : isEmpty(users) ? 'User list is empty'
            : users.map((data, id) => {
                console.log(profile);
                if(data.value.providerData[0].uid === profile.providerData[0].uid){
                    return <div></div>;
                }
                return <User id={id} user={data} isOnline={presence.find(p => p.key === data.key) !== undefined} />
            });
    return (
        <div className="user-list-container">
            {userList}
        </div>
    )
}
