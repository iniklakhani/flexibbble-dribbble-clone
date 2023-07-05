import { ProjectInterface, UserProfile } from '@/common.types'
import { Button } from '@/ui-shadcn/components/ui/button'
import { EnvelopeOpenIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from './ProjectCard'

type Props = {
  user: UserProfile
}

const ProfilePage = ({ user }: Props) => {
  return (
    <>
      <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
        <section className="flexBetween max-lg:flex-col gap-10 w-full pt-5">
          <div className="flex items-start flex-col w-full">
            <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
            <p className="text-4xl font-bold mt-10">{user?.name}</p>
            <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
              I’m Software Engineer at JSM 👋
            </p>

            <div className="flex mt-8 gap-5 w-full flex-wrap">
              <Link href="#">
                <Button>
                  <PlusCircledIcon className="w-4 h-4 mr-2" />
                  Follow Me
                </Button>
              </Link>
              <Link href={`mailto:${user?.email}`}>
                <Button>
                  <EnvelopeOpenIcon className="w-4 h-4 mr-2" />
                  Hire Me
                </Button>
              </Link>
            </div>
          </div>

          {user?.projects?.edges?.length > 0 ? (
            <Image
              src={user?.projects?.edges[0]?.node?.image}
              alt="project image"
              width={739}
              height={554}
              className="rounded-xl object-contain"
            />
          ) : (
            <Image src="/profile-post.png" width={739} height={554} alt="project image" className="rounded-xl" />
          )}
        </section>

        <section className="flexStart flex-col lg:mt-28 mt-16 mb-16 w-full">
          <h3 className="w-full text-left text-2xl font-semibold">Recent Work</h3>

          <div className="profile_projects">
            {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                avatarUrl={user.avatarUrl}
                userId={user.id}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  )
}

export default ProfilePage
