import { ACTION_TYPE } from '../action/UserListAction'

export function userListReducer(state = [], action) {
    switch (action.type) {
        case ACTION_TYPE.SELECT_USER: {
            return Object.assign({}, state, {
                uidToChat: action.uid
            })
        }
        default:
            return state;
    }
}
