
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect} from 'react-redux-firebase';
import {Home} from '../component/Home'
export const HomeContainer = compose(
    firebaseConnect(["presence", "users"]),
    connect(({ firebase: { auth, profile, ordered } }) => ({
        presence: ordered.presence,
        users: ordered.users,
        auth,
        profile
    }))
)(Home)