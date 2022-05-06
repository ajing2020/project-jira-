import React from 'react'
import { AuthenticatedApp } from 'authenticatedApp'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'
import { ErrorBoundary } from 'components/errorBoundary'
import { FullPageErrorFallbak } from 'components/lib'

function App() {
  const { user } = useAuth()
  return (
    <div>
      <ErrorBoundary fallbackRender={FullPageErrorFallbak}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
