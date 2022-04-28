import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { loadDevTools } from 'jira-dev-tool'
//务必在jira-dev-tool后引入
import 'antd/dist/antd.less'
import { AppProviders } from 'context'

loadDevTools(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
})
reportWebVitals()
