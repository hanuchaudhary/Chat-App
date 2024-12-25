import { FC } from 'react'
import { Avatar } from '../Avatar'

interface OutgoingMessageProps {
  message: string
  timestamp: string
  email: string
}

export const OutgoingMessage: FC<OutgoingMessageProps> = ({ message, timestamp, email }) => {
  return (
    <div className="flex flex-row-reverse items-start mb-4 space-x-2 space-x-reverse">
      <Avatar email={email} size="md" />
      <div className="flex flex-col items-end">
        <span className="text-xs text-neutral-300 mb-1">{email}</span>
        <div className="bg-neutral-500 rounded-lg py-2 px-4 max-w-[70%]">
          <p className="text-sm text-white">{message}</p>
          <p className="text-xs text-neutral-200 mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

