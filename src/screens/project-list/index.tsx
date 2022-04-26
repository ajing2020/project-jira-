import { useState, useEffect } from 'react'
import SearchPanel from './SearchPanel'
import List from './List'
import qs from 'qs'
import { cleanObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
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
