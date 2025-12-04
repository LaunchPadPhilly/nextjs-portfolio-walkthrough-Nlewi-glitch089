import Link from 'next/link'

export default function Home() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-heading mb-6">Hi, I'm Jaylen Marshall</h1>
          <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto">
            Front-End Engineer focused on crafting responsive, accessible, and performant web experiences using React, Next.js, and modern tooling.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="card-surface p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4 text-white">Core Focus</h2>
            <p className="text-base text-slate-300 leading-relaxed">Building clean UI components, refining developer workflows, and shipping user-centered features with scalability in mind.</p>
          </div>
          <div className="card-surface p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold mb-4 text-white">Current Goals</h2>
            <p className="text-base text-slate-300 leading-relaxed">Growing deeper expertise in frontend architecture, testing strategies, and design systems while collaborating on real-world products.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
