'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

import { SessionInterface } from '@/common.types'

import { Cog, LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui-shadcn/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui-shadcn/components/ui/dropdown-menu'
import { Button } from '@/ui-shadcn/components/ui/button'

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
            <AvatarFallback>{session.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="relative">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
              <Link
                href={`/profile/${session?.user?.id}`}
                className="text-sm absolute w-full h-full top-0 left-0"
              ></Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="relative">
              <Cog className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <Link
                href={`/profile/${session?.user?.id}`}
                className="text-sm absolute w-full h-full top-0 left-0"
              ></Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="relative">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <Button variant="link" className="absolute w-full h-full top-0 left-0" onClick={() => signOut()}></Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ProfileMenu
