import React from 'react'
import '../css/MessageBlock.css'

const MessageBlock = ({ sendTime, message, photoUrl, from, authId }) => {
    var className = "";
    if (from === authId) {
        className = "message-block d-flex flex-row-reverse";
        
    }
    else {
        className = "message-block float-md-left row";
        
    }
    return (
        <div className={className}>
            <img className={"chat-avt"} src={photoUrl} alt="" />
            <div className={"message-content-container"}>
                <div className={"message-content"}>
                    <p>{message}</p>
                </div>
                <div className={"send-time"}>
                    {sendTime}
                </div>
            </div>
        </div>
    )
}

export default MessageBlock;