import SearchPanel from './SearchPanel'
import { List } from './List'
import { useDocumentTitle, useDebounce } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const { open } = useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 2000))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={'link'} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  )
}

// 使用@welldone-software/why-did-you-render单独检测该组件
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
