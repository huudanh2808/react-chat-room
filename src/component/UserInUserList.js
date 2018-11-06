import React from 'react'
import '../css/UserList.css'
import { selectUser } from '../action/UserListAction'
import { connect } from 'react-redux'
import {isLoaded, isEmpty } from 'react-redux-firebase';
const UserInUserList = ({ user, isOnline, id, onClick , selectedUid}) => {
    var status = null
    if (isOnline) {
        status = <div className={"online-status online"}>{"Online now"}</div>;
    }
    else {
        status = <div className={"online-status offline"}>{"Last online"}</div>;
    }
    var className = "user-in-user-list-container";
    if(isLoaded(selectedUid) && user.value.providerData[0].uid === selectedUid){
        className = "user-in-user-list-container selected"
    }
    return (
        <div id={id}>
            <div onClick={() => onClick(user.value.providerData[0].uid)} className={className}>
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (uid) => {
            dispatch(selectUser(uid));
        }
    }
}
const mapStateToProps = (state) => {
    return {
        selectedUid: state.userListReducer.uidToChat
    }
}
const User = connect(mapStateToProps,
    mapDispatchToProps
)(UserInUserList)

export default User;