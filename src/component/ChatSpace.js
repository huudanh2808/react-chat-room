import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase';
import '../css/ChatSpace.css'
import MessageBlock from './MessageBlock';
import MessageArea from './MessageArea'

export const ChatSpace = ({ auth, profile, uidToChat, sendMessages, recivedMessages }) => {
    var messageDiv = [];
    var isDisbled = true;
    var input;
    var fileUpload;
    if (isLoaded(recivedMessages) && isLoaded(auth) && isLoaded(uidToChat)) {
        isDisbled = false;
        if(!isEmpty(recivedMessages)){
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
                <input type="file" accept="image/*" ref={(ref) => fileUpload = ref} />
                <input disabled={isDisbled} className="submit-button" onClick={() => {

                    if (fileUpload.files[0] !== undefined) {
                        var messageWithImg = {};
                        var reader = new FileReader();
                        reader.readAsDataURL(fileUpload.files[0]);
                        reader.onload = () => {
                            console.log(reader.result);
                            messageWithImg = {
                                imgUrl: reader.result,
                                messageContent: input.value
                            }
                            var toSendMessage = JSON.stringify(messageWithImg);
                            sendMessages(toSendMessage);
                        };
                    }
                    else {
                        if (input.value !== "") {
                            sendMessages(input.value);
                        }
                    }
                    input.value = "";
                }} type="button" value="Send" />
            </div>
        </div>
    )
}
