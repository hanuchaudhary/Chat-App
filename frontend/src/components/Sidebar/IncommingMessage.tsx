import { FC } from 'react'
import { Avatar } from '../Avatar'

interface IncomingMessageProps {
  message: string
  timestamp: string
  email: string
}

export const IncomingMessage: FC<IncomingMessageProps> = ({ message, timestamp, email }) => {
  return (
    <div className="flex items-start mb-4 space-x-2">
      <Avatar email={email} size="md" />
      <div className="flex flex-col">
        <span className="text-xs text-neutral-300 mb-1">{email}</span>
        <div className="bg-neutral-200 rounded-lg py-2 px-4 max-w-[70%]">
          <p className="text-sm text-neutral-800">{message}</p>
          <p className="text-xs text-neutral-500 mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

