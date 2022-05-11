import { useTaskTypes } from 'utils/task-type'
import { IdSelect } from './idSelect'

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props} />
}
