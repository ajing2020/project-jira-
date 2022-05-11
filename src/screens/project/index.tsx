import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen组件</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />} />
        <Route path={'epic'} element={<EpicScreen />} />
        <Route
          path={'/'}
          element={
            <Navigate
              replace={true}
              to={window.location.pathname + '/kanban'}
            />
          }
        />
      </Routes>
    </div>
  )
}
