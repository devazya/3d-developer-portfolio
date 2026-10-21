import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';


export default function ProjectsSection() {
  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Flagship Projects</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">Client-grade platforms shipped end to end, measured by business impact.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
