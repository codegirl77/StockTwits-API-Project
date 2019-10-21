import React from 'react';
import styles from '../public/styles.css'

const MessageEntry = ({message}) =>(
  <div className='messageEntryContainer'>
      <div className='messageEntryCreatedAt'>Created At: {message.created_at}</div>
      <div className='messageEntryMessage'>Message: {message.body}</div>
      <div className='messageEntryUsername'>Username: {message.user.username}</div>
  </div>
)

export default MessageEntry;