import styled from '@emotion/styled'
import { Card } from 'antd'
import { useTasks } from 'screens/project-list/task'
import { Kanban } from 'types/kanban'
import { useTaskTypes } from 'utils/task-type'
import { useTasksSearchParams } from './util'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />
}

export const KanbanColumn = ({ kanban, ...props }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  console.log(tasks, 'wwwwsss')

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((item) => (
          <Card
            style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            key={item.id}
          >
            <div key={item.id}>{item.name}</div>
            <TaskTypeIcon id={item.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
