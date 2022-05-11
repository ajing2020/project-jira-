import styled from '@emotion/styled'
import React from 'react'
import { useKanbans } from 'utils/kanban'
import { useDocumentTitle } from 'utils'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  console.log(kanbans, 'kanbans')

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((item) => (
          <KanbanColumn kanban={item} key={item.id} />
        ))}
      </ColumnsContainer>
    </div>
  )
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
