import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect} from 'react-redux-firebase';
import {UserList} from '../component/UserList'


export const UserListContainer =  compose(
    firebaseConnect(["presence", "users"]),
    connect(({ firebase: { ordered, profile } }) => ({
        presence: ordered.presence,
        users: ordered.users,
        profile: profile
    }))
)(UserList) 