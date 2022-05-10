import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined
      }),
      [param]
    ),
    setParam
  ] as const
}

// 全局状态Modal（通过url参数）
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    projectCreate
      ? setProjectCreate({ projectCreate: '' })
      : setEditingProjectId({ editingProjectId: '' })
  }
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
