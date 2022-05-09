import { useState } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState
  })
  const mountedRef = useMountedRef()
  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null
    })

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: 'error'
    })

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setState({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data)
        return data
      })
      .catch((error) => {
        //catch会消耗异常 如果不主动抛出 外面是接受不到异常的
        setError(error)
        if (config.throwOnError) {
          return Promise.reject(error)
        }
        return error
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}
