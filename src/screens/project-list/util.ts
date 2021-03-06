import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url'

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
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
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
  const setUrlParams = useSetUrlSearchParam()

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () =>
    setUrlParams({ projectCreate: undefined, editingProjectId: undefined })
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
