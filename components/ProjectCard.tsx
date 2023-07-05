'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui-shadcn/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  id: string
  image: string
  title: string
  name: string
  avatarUrl: string
  userId: string
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  const [randomLikes, setRandomLikes] = useState(0)
  const [randomViews, setRandomViews] = useState('0')

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000))
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k')
  }, [])

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link href={`/work/${id}`} className="flexCenter group relative w-full h-full">
        <Image src={image} alt={title} width={414} height={314} className="w-full h-full object-cover rounded-2xl" />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link className="" href={`/profile/${userId}`}>
          <span className="flexCenter gap-2">
            <Avatar className="h-6 w-6 cursor-pointer">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </span>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/heart.svg" width={13} height={12} alt="" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
