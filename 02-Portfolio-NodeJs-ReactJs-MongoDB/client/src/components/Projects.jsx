import { useQuery } from 'react-query'
import { portfolioAxios } from '../customAxios'
import Project from './Project'
import SectionTitle from './SectionTitle'

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await portfolioAxios.get('/projects')
      return data.data.projects
    },
  })
  if (isLoading) {
    return <div>Loading....</div>
  }
  return (
    <section id="projects" className="align-element py-20">
      <SectionTitle title="Web Creations" />
      <div className="py-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />
        })}
      </div>
    </section>
  )
}
export default Projects
