import { useQuery } from 'react-query'
import { portfolioAxios } from '../customAxios'
import Skill from './Skill'
import SectionTitle from './SectionTitle'

const Skills = () => {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await portfolioAxios('/skills')
      return data.data.skills
    },
  })
  if (isLoading) {
    return <div className="loading"></div>
  }
  return (
    <section id="skills" className="align-element py-20">
      <SectionTitle title="Tech Stack" />
      <article className="py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          return <Skill key={skill._id} {...skill} />
        })}
      </article>
    </section>
  )
}
export default Skills
