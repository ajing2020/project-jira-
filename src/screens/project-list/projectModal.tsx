import { Button, Drawer } from 'antd'

interface ProjectModalProps {
  projectModalOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = (props) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
