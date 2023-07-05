'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteProject, fetchToken } from '@/lib/actions'
import { Button } from '@/ui-shadcn/components/ui/button'
import { Trash } from 'lucide-react'

type Props = {
  projectId: string
}

const ProjectActions = ({ projectId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const router = useRouter()

  const handleDeleteProject = async () => {
    setIsDeleting(true)
    const { token } = await fetchToken()

    try {
      await deleteProject(projectId, token)
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link href={`/edit-work/${projectId}`} className="flexCenter edit-action_btn">
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <Button disabled={isDeleting} onClick={handleDeleteProject} className="h-[39px] w-[39px] p-0">
        <Trash className="h-4 w-4" />
      </Button>
    </>
  )
}

export default ProjectActions
