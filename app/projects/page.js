import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with shopping cart, user authentication, and payment integration. Built with modern web technologies for a seamless shopping experience.",
      image: "https://placehold.co/600x400/fbcfe8/9f1239?text=E-Commerce+Platform",
      technologies: ["Next.js", "React", "Tailwind CSS", "Stripe"],
      status: "Completed"
    },
    {
      title: "Task Management App",
      description: "A productivity application that helps teams organize and track their work. Features include drag-and-drop functionality, real-time updates, and team collaboration tools.",
      image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Task+Manager",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Progress"
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather application that displays current conditions and forecasts. Includes location-based services and interactive maps for weather visualization.",
      image: "https://placehold.co/600x400/fce7f3/9f1239?text=Weather+App",
      technologies: ["JavaScript", "API Integration", "CSS3", "Chart.js"],
      status: "Completed"
    }
  ]

  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-heading text-center mb-4">My Projects</h1>
        <p className="text-center text-slate-300 text-lg mb-16 max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my skills in web development and AI integration.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Formora */}
          <div className="card-surface overflow-hidden group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <Image src="/sa-logo.png" alt="Formora Logo" width={100} height={100} className="object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Formora</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed min-h-[60px]">
                AI-powered educational platform that creates personalized learning paths tailored to your career goals.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">React</span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">JavaScript</span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">Firebase</span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">OpenAI API</span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">Vite</span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">HTML/CSS</span>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  {project.title}
                </h3>
                <p className="text-purple-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

          {/* Arcania */}
          <div className="card-surface overflow-hidden group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <Image src="/arcania-logo2.png" alt="Arcania Logo" width={100} height={100} className="object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">Arcania</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed min-h-[60px]">
                AI-powered Minecraft build assistant that generates creative concepts from your descriptions.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wider">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">React</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">JavaScript</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">Groq API</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">OpenAI API</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">Vite</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">HTML/CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Najah */}
          <div className="card-surface overflow-hidden group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <Image src="/najah-logo.png" alt="Najah Logo" width={100} height={100} className="object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">Najah</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed min-h-[60px]">
                Study productivity application helping students stay organized, focused, and achieve their goals.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">React</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">JavaScript</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">Gemini API</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">Markdown</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">Vite</span>
                    <span className="px-3 py-1.5 rounded-full bg-green-600/20 text-green-300 text-xs font-medium border border-green-500/30">HTML/CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
