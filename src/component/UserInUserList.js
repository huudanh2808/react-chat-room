import React from 'react'
import '../css/UserList.css'



const UserInUserList = ({ user, isOnline, id }) => {
    
    var status = null
    if(isOnline){
        status = <div className={"online-status online"}>{"Online now"}</div>;
    }
    else {
        status = <div className={"online-status offline"}>{"Last online"}</div>;
    }
    return (
        <div id={id}>
            <div className="user-in-user-list-container ">
                <div className="row user-info-in-list-wrapper">
                    <img className="user-avt-in-list" src={user.value.avatarUrl} alt="" />
                    <div>
                        <div className="user-name-in-list">{user.value.displayName}</div>
                        {status}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default UserInUserList;