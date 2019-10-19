import React from 'react';

const MessageEntry = ({message}) =>(
  <div>
      <div>Created At:{message.created_at}</div>
      <div>Message:{message.body}</div>
      <div>Username:{message.user.username}</div>
  </div>
)

export default MessageEntry;