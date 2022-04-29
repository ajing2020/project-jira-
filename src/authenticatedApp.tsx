import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rm 1fr;
  height: 100vh;
`
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const HeaderRight = styled.div``
const Main = styled.main`
  grid-area: main;
`
