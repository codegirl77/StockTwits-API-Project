import React from 'react';
import MessageEntry from './MessageEntry.jsx';
import styles from '../public/styles.css'

const MessageList = ({messages}) =>(
  <div className="messageListContainer">
    {messages.map((message)=>(
       <MessageEntry key={message.id} message={message}/>
    ))}
  </div>
)

export default MessageList;