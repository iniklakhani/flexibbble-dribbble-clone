import { redirect } from 'next/navigation'

import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import { getCurrentUser } from '@/lib/session'
import { getProjectDetails } from '@/lib/actions'
import { ProjectInterface } from '@/common.types'

const EditWork = async ({ params: { projectId } }: { params: { projectId: string } }) => {
  const session = await getCurrentUser()
  if (!session) redirect('/')

  const result = (await getProjectDetails(projectId)) as { project?: ProjectInterface }

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result?.project} />
    </Modal>
  )
}

export default EditWork
