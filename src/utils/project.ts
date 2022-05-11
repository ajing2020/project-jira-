import { Project } from 'types/project'
import { useHttp } from './http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig
} from './use-optimistic-options'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: param })
  )
}

// 编辑
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}

// 新增
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

// 搜索
export const useProject = (id?: number) => {
  const client = useHttp()

  return useQuery(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id
  })
}

// 删除
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
