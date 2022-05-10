import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/projectModal'
import { ProjectPopover } from 'components/projectPopover'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </Main>
        <ProjectModal />
      </BrowserRouter>
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type="link"
          onClick={resetRoute}
        >
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button href={''} onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.header``
const Main = styled.main``
