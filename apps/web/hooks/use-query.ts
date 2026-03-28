import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useQuery() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQuery = useCallback(
    (name: string, value: string, options?: { replace?: boolean }) => {
      const queryString = createQueryString(name, value)
      if (options?.replace) {
        router.replace(pathname + '?' + queryString, { scroll: false })
      } else {
        router.push(pathname + '?' + queryString, { scroll: false })
      }
    },
    [router, pathname, createQueryString]
  )

  const getQuery = useCallback(
    (name: string) => {
      return searchParams.get(name)
    },
    [searchParams]
  )

  return { setQuery, getQuery, searchParams }
}
