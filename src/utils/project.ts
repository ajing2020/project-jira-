import { Project } from 'screens/project-list/List'
import { useHttp } from './http'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectsSearchParams } from 'screens/project-list/util'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: param })
  )
}

// 编辑
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey)
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((item) =>
              item.id === target.id ? { ...item, ...target } : item
            ) || []
          )
        })
        return { previousItems }
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        )
      }
    }
  )
}

// 新增
export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

// 搜索
export const useProject = (id?: number) => {
  const client = useHttp()

  return useQuery(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id
  })
}
