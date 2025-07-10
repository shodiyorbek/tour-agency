"use client"

import * as React from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}