import React, { ReactNode, useState } from 'react'
import * as auth from 'authProvider'
import { User } from 'screens/project-list/SearchPanel'

const AuthContext = React.createContext<
  | {
      user: User | null
      login: (form: AuthForm) => Promise<void>
      register: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

interface AuthForm {
  username: string
  password: string
}

// 主要数据处理逻辑
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // 调用接口获取数据
  // const login = (form:AuthForm) => auth.login(form).then(user => setUser(user))
  // const register = (form:AuthForm) => auth.register(form).then(user => setUser(user))
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }

  return context
}
