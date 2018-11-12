import React from 'react'
import '../css/MessageBlock.css'

const FROM_FRIEND_BLOCK = "message-block float-md-left row";
const FROM_USER_BLOCK = "message-block d-flex flex-row-reverse"
const MESSAGE_CONTENT_CONTAINER = "message-content-container"
const isPhotoUrl = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const MessageBlock = ({ sendTime, message, photoUrl, from, authId }) => {
    var rootClassName = "";
    var messageContentContainerClassName = MESSAGE_CONTENT_CONTAINER;
    var messageContent = <p>{message}</p>
    rootClassName = from === authId ? FROM_USER_BLOCK : FROM_FRIEND_BLOCK;
    if (isJsonString(message)) {
        var messageJson = JSON.parse(message);
        if (isRightMessage(messageJson)) {
            messageContent = <img className={"photo-in-message"} src={messageJson.imgUrl} alt="" />
        }
    }
    else {
        if (isPhotoUrl(message)) {
            messageContent = <img className={"photo-in-message"} src={message} alt="" />
            messageContentContainerClassName = messageContentContainerClassName.concat(" img-block")
        }
    }
    return (
        <div className={rootClassName}>
            <img className={"chat-avt"} src={photoUrl} alt="" />
            <div className={messageContentContainerClassName}>
                <div className={"message-content"}>
                    {messageContent}
                </div>
                <div className={"send-time"}>
                    {sendTime}
                </div>
            </div>
        </div>
    )
}
function isRightMessage(messageJson) {
    if (messageJson.hasOwnProperty('imgUrl')
        && messageJson.hasOwnProperty('messageContent')) {
        return true;
    }
    else {
        return false;
    }
}

function isJsonString(message) {
    try {
        JSON.parse(message);
    } catch (e) {
        return false;
    }
    return true;
}

export default MessageBlock;