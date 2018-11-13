import { connect } from 'react-redux'
import { withHandlers, compose } from 'recompose'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { ChatSpace } from '../component/ChatSpace'
import { resolve } from 'path';
import { rejects } from 'assert';

export const ChatSpaceContainer = compose(
    firebaseConnect({ path: 'messages' }),
    connect(({ firebase: { auth, profile, ordered }, userListReducer: { uidToChat } }) => ({
        uidToChat: uidToChat,
        recivedMessages: ordered.messages,
        auth,
        profile
    })),
    withHandlers({
        sendMessages: props => message => {
            if (isLoaded(props.auth) && isLoaded(props.profile)) {
                var currentDate = new Date();
                props.firebase.push(`/messages/${props.auth.providerData[0].uid}/${props.uidToChat}`, {
                    from: props.auth.providerData[0].uid,
                    message: message,
                    sendTime: `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
                    timeStamp: currentDate.getTime(),
                    avatar: props.profile.avatarUrl
                })
                props.firebase.push(`/messages/${props.uidToChat}/${props.auth.providerData[0].uid}`, {
                    from: props.auth.providerData[0].uid,
                    message: message,
                    sendTime: `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
                    timeStamp: currentDate.getTime(),
                    avatar: props.profile.avatarUrl
                })
            }
        },
        uploadAndGetUrl: props => file => {
            var promise = new Promise((resolve, rejects) => {
                const { firebase: { storage } } = props;
                const storageRef = storage().ref(`images/${file.name}`);
                storageRef.put(file)
                    .then((snapshot) => {
                        storageRef.getDownloadURL().then(result => {
                            resolve(result);
                        });
                    });;
            })
            return promise;
           
        }
    })

)(ChatSpace)