import { FC } from 'react'

interface AvatarProps {
  email: string
  size?: 'sm' | 'md' | 'lg'
}

export const Avatar: FC<AvatarProps> = ({ email, size = 'md' }) => {
  const initials = email
    .split('@')[0]
    .split('.')
    .map(name => name[0].toUpperCase())
    .join('')
    .slice(0, 2)

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-neutral-300 flex items-center justify-center font-semibold text-neutral-700`}
      aria-label={`Avatar for ${email}`}
    >
      {initials}
    </div>
  )
}

