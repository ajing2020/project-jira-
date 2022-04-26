import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

//在函数中改变传入的对象是不好的
interface resObj {
  [key: string]: any
}
export const cleanObject = (object: object) => {
  const result: resObj = { ...object }
  Object.keys(result).forEach((key: string) => {
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

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    //每次在value变化之后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    //return的执行时间就是uesEffect监听到变化的时候执行  然后开下一个新的
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}
