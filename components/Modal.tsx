'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback, useRef } from 'react'

export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.push('/')
  }, [router])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss()
      }
    },
    [onDismiss, overlay]
  )

  return (
    <div className="modal" ref={overlay} onClick={(e) => handleClick(e)}>
      <button onClick={onDismiss} className="absolute top-[40px] translate-y-[-50%] right-[2.5%]" type="button">
        <Image src="/close.svg" width={22} height={22} alt="Close" />
      </button>

      <div className="modal_wrapper" ref={wrapper}>
        {children}
      </div>
    </div>
  )
}
