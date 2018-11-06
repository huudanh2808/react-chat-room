import React from 'react'
import { connect } from 'react-redux'
import { withHandlers, compose } from 'recompose'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/ChatSpace.css'
import MessageBlock from './MessageBlock';
const ChatSpace = ({ auth, profile, uidToChat, sendMessages, recivedMessages }) => {
    var messageDiv = [];
    var isDisbled = true;
    if (isLoaded(recivedMessages) && !isEmpty(recivedMessages) && isLoaded(auth) && isLoaded(uidToChat)) {
        isDisbled = false;
        var thisUserMessagesRawData = recivedMessages.find(data =>
            data.key === auth.providerData[0].uid
        );
        if (thisUserMessagesRawData != {}) {
            thisUserMessagesRawData = thisUserMessagesRawData.value[uidToChat];
            for (var element in thisUserMessagesRawData) {
                var item = thisUserMessagesRawData[element];
                messageDiv.push(
                    <MessageBlock sendTime={item.sendTime}
                        message={item.message}
                        from={item.from}
                        authId={auth.providerData[0].uid}
                        photoUrl={item.avatar} />)
            }
        }
    }
    else {
        isDisbled = true
    }
    var input;
    return (
        <div className="chat-area">
            <div className="messages-area">
                {messageDiv}
            </div>
            <div className="input-area">
                <textarea disabled={isDisbled} className="text-area" ref={node => input = node}></textarea>
                <input disabled={isDisbled} className="submit-button" onClick={() => { sendMessages(input.value); input.value = "" }} type="button" value="Send" />
            </div>
        </div>
    )
}
export default compose(
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
                console.log(props.profile);
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
        }
    })

)(ChatSpace)