import React from 'react'
import {isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/ChatSpace.css'
import MessageBlock from './MessageBlock';
import MessageArea from './MessageArea'

export const ChatSpace = ({ auth, profile, uidToChat, sendMessages, recivedMessages }) => {
    var messageDiv = [];
    var isDisbled = true;
    var input;
    if (isLoaded(recivedMessages) && !isEmpty(recivedMessages) && isLoaded(auth) && isLoaded(uidToChat)) {
        isDisbled = false;
        var thisUserMessagesRawData = recivedMessages.find(data =>
            data.key === auth.providerData[0].uid
        );
        if (thisUserMessagesRawData !== {}) {
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

    return (
        <div className="chat-area">
            <MessageArea className="messages-area" messageBlocks={messageDiv}>
            </MessageArea>
            <div className="input-area">
                <textarea disabled={isDisbled} className="text-area" ref={node => input = node}></textarea>
                <input disabled={isDisbled} className="submit-button" onClick={() => {
                    if (input.value !== "") {
                        sendMessages(input.value);
                    }
                    input.value = "";
                }} type="button" value="Send" />
            </div>
        </div>
    )
}
