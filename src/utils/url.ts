import { useMemo, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from 'utils'

/**
 * 如果你定义了一个变量，满足下面的条件就最好用useMemo和useCallback给包裹住：
 * 1. 它不是状态，也就是说，不是用useState定义的(redux中的状态实际上也是用useState定义的)
 * 2. 它不是基本类型
 * 3. 它会被放在useEffect的依赖列表里 || 自定义hook的返回值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stateKeys] = useState(keys)

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator 迭代器: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
  // 返回tuple(元组)类型，里面的子类型不一样的时候要使用 as const
}
