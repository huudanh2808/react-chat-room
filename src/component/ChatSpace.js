import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/ChatSpace.css'
import MessageBlock from './MessageBlock';
import MessageArea from './MessageArea'

export const ChatSpace = ({ auth, profile, storage, uidToChat, sendMessages, recivedMessages, uploadAndGetUrl }) => {
    var messageDiv = [];
    var isDisbled = true;
    var input;
    var fileUpload;
    if (isLoaded(recivedMessages) && isLoaded(auth) && isLoaded(uidToChat)) {
        isDisbled = false;
        if (!isEmpty(recivedMessages)) {
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
                    if (fileUpload.files[0] !== undefined) {
                        const messageContent = input.value;
                        const file = fileUpload.files[0];
                        uploadAndGetUrl(file).then(result => {
                            var messageWithImg = {
                                imgUrl: result,
                                messageContent: messageContent
                            }
                            sendMessages(JSON.stringify(messageWithImg));
                        });
                        fileUpload.value = ""; 
                    }
                    else {
                        sendMessages(input.value);
                        console.log(fileUpload.files);
                    }
                    input.value = "";
                }}
                    type="button" value="Send" />
            </div>
            <input className={"input-file"} disabled={isDisbled} type="file" accept="image/*" ref={(ref) => fileUpload = ref} />
        </div>
    )
}

