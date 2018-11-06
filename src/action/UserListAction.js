export const ACTION_TYPE = {
    SELECT_USER: 'SELECT_USER'
};

export function selectUser(uid, targetPhotoUrl) {
    return { type: ACTION_TYPE.SELECT_USER, uid}
}