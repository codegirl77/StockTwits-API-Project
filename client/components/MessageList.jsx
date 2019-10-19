import React from 'react';
import MessageEntry from './MessageEntry.jsx';

const MessageList = ({messages}) =>(
  <div>
    {messages.map((message)=>(
       <MessageEntry key={message.id} message={message}/>
    ))}
  </div>
)

export default MessageList;