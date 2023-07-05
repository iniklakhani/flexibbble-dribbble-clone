import { ProjectInterface } from '@/common.types'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/actions'

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch
  const projectsToRender = data?.projectSearch?.edges || []
  if (!projectsToRender.length) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No projects found.</p>
      </section>
    )
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>

      <section className="projects-grid">
        {projectsToRender.map(({ node }: { node: ProjectInterface }) => {
          return (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
          )
        })}
      </section>

      <h1 className="mt-10">Load more</h1>
    </section>
  )
}

export default Home
