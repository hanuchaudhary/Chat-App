import { FC } from 'react';
import { IncomingMessage } from './IncommingMessage'
import { OutgoingMessage } from './OutgoingMessage'

export const Chat: FC = () => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <IncomingMessage 
        message="Hey there! How are you doing?" 
        timestamp="10:00 AM"
        email="friend@example.com"
      />
      <OutgoingMessage 
        message="Hi! I'm doing great, thanks for asking. How about you?" 
        timestamp="10:02 AM"
        email="me@example.com"
      />
      <IncomingMessage 
        message="I'm good too! Just working on some new projects." 
        timestamp="10:05 AM"
        email="friend@example.com"
      />
      <OutgoingMessage 
        message="That sounds interesting! What kind of projects are you working on?" 
        timestamp="10:07 AM"
        email="me@example.com"
      />
    </div>
  )
}

