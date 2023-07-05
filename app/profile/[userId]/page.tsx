import { UserProfile } from '@/common.types'
import ProfilePage from '@/components/ProfilePage'
import { getUserProjects } from '@/lib/actions'

type Props = {
  params: {
    userId: string
  }
}

const Profile = async ({ params }: Props) => {
  const { userId } = params
  const result = (await getUserProjects(userId, 100)) as { user: UserProfile }

  if (!result?.user) {
    return <p className="no-result-text text-4xl text-center py-20">Failed to fetch user information.</p>
  }

  return <ProfilePage user={result.user} />
}

export default Profile
