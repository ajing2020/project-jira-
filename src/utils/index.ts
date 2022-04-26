import { useEffect, useState } from 'react'

export const isFalsy = (value: any) => (value === 0 ? false : !value)

//在函数中改变传入的对象是不好的
export const cleanObject = (object: Object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line
  }, [])
}

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    //每次在value变化之后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    //return的执行时间就是uesEffect监听到变化的时候执行  然后开下一个新的
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
