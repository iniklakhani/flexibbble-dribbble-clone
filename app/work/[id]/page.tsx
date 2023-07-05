import { ProjectInterface } from '@/common.types'
import Modal from '@/components/Modal'
import ProjectActions from '@/components/ProjectActions'
import RelatedProjects from '@/components/RelatedProjects'
import { getProjectDetails } from '@/lib/actions'
import { getCurrentUser } from '@/lib/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui-shadcn/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'

const Work = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser()
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface
  }

  if (!result.project) {
    return <div>Failed to fetch the details.</div>
  }

  const projectDetails = result?.project
  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-5xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Avatar className="h-12 w-12 cursor-pointer">
              <AvatarImage src={projectDetails?.createdBy?.avatarUrl} alt={projectDetails?.createdBy?.name} />
              <AvatarFallback>{projectDetails?.createdBy?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">{projectDetails?.title}</p>
            <div className="user-info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link href={`/?category=${projectDetails.category}`} className="text-primary-purple font-semibold">
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-10 max-w-5xl w-full">
        <Image
          src={`${projectDetails?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-10 max-w-5xl w-full">
        <div className="max-w-5xl font-normal whitespace-pre-line text-justify">{projectDetails?.description}</div>

        <div className="flex flex-wrap mt-10 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-20">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects userId={projectDetails?.createdBy?.id} projectId={projectDetails?.id} />
    </Modal>
  )
}

export default Work
