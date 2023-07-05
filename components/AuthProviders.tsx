'use client'
import { useEffect, useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import { Button } from '@/ui-shadcn/components/ui/button'
import Image from 'next/image'

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index) => {
          return (
            <Button key={index} onClick={() => signIn(provider?.id)}>
              <Image src="/google.svg" height={24} width={24} alt="" className="mr-2 -ml-1" />
              Login<span className="hidden md:inline-block">&nbsp;with {provider?.name}</span>
            </Button>
          )
        })}
      </div>
    )
  }
}

export default AuthProviders
