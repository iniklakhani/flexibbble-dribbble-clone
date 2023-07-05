'use client'

import { Button } from '@/ui-shadcn/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: Props) => {
  const router = useRouter()

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search)

    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor')
      currentParams.set('endcursor', endCursor)
    } else if (direction === 'previous' && hasPreviousPage) {
      currentParams.delete('endcursor')
      currentParams.set('startcursor', startCursor)
    }

    const newSearchParams = currentParams.toString()
    const newPathname = `${window.location.pathname}?${newSearchParams}`

    router.push(newPathname)
  }

  return (
    <div className="flexCenter mt-20">
      {hasPreviousPage && (
        <Button className="py-6" size="lg" onClick={() => handleNavigation('previous')}>
          First Page
        </Button>
      )}
      {hasNextPage && (
        <Button className="py-6" size="lg" onClick={() => handleNavigation('next')}>
          Next Page
        </Button>
      )}
    </div>
  )
}

{
  /* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */
}
