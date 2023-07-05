'use client'

import { categoryFilters } from '@/constants'
import { Button } from '@/ui-shadcn/components/ui/button'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || ''

  const handleTags = (selected: string) => {
    router.push(`${pathName}?category=${selected}`)
  }

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => {
          return (
            <Button
              variant={filter === category ? 'secondary' : 'link'}
              key={filter}
              onClick={() => handleTags(filter)}
              className="px-4 py-3 rounded-lg capitalize whitespace-nowrap hover:no-underline"
            >
              {filter}
            </Button>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
