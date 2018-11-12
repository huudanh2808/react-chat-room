import React from 'react'
import '../css/MessageBlock.css'

const FROM_FRIEND_BLOCK = "message-block float-md-left row";
const FROM_USER_BLOCK = "message-block d-flex flex-row-reverse"
var MESSAGE_CONTENT_CONTAINER = "message-content-container"
const isPhotoUrl = (url) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const MessageBlock = ({ sendTime, message, photoUrl, from, authId }) => {
    var rootClassName = "";
    var messageContentContainerClassName = MESSAGE_CONTENT_CONTAINER;
    var messageContent = <p>{message}</p>
    rootClassName = from === authId ? FROM_USER_BLOCK : FROM_FRIEND_BLOCK;
    if(isPhotoUrl(message)){
        messageContent = <img className={"photo-in-message"} src={message} alt=""/>
        messageContentContainerClassName = messageContentContainerClassName.concat(" img-block")
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

export default MessageBlock;