import React from 'react'
import '../css/ChatSpace.css'

export default class MessageArea extends React.Component {
    
    scrollToBottom = () => {
        const scrollHeight = this.messagesEnd.scrollHeight;
        const height = this.messagesEnd.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        return (
            <div className="messages-area" ref={(el) => { this.messagesEnd = el; }}>
                {this.props.messageBlocks}
            </div>)
    }

}

