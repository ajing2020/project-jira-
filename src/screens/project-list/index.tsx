import { useState, useEffect } from 'react'
import SearchPanel from './SearchPanel'
import List from './List'
import qs from 'qs'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)
  const [list, setList] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
