import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { Project } from 'types/project'
import { useDeleteProject, useEditProject } from 'utils/project'
import { User } from 'types/user'
import { useProjectModal, useProjectsQueryKey } from './util'

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={`projects/${String(project.id)}`}>{value}</Link>
      }
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      dataIndex: 'personId',
      key: 'personId',
      render: (value) => {
        return <span>{users.find((user) => user.id === value)?.name}</span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format('YYYY-MM-DD')
              : '无'}
          </span>
        )
      }
    },
    {
      render(value, project) {
        return <More project={project} />
      }
    }
  ]
  return (
    <Table
      rowKey={(record) => record.id}
      pagination={false}
      columns={columns}
      {...props}
    ></Table>
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({ id })
      }
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={'edit'}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={'delete'}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
