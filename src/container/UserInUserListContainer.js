import { selectUser } from '../action/UserListAction'
import { connect } from 'react-redux'
import {UserInUserList} from '../component/UserInUserList'

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
export const User = connect(mapStateToProps,
    mapDispatchToProps
)(UserInUserList)
