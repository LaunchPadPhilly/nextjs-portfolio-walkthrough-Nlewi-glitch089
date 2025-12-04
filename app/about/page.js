import Image from 'next/image'

export default function About() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="section-heading text-center mb-16">About Me</h1>
        
        <div className="card-surface p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Profile photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-lg opacity-30"></div>
                <Image 
                  src="/profile.jpg"
                  alt="My photo"
                  width={200}
                  height={200}
                  className="rounded-full relative z-10 border-4 border-slate-700/50"
                />
              </div>
            </div>
            
            {/* Bio */}
            <div className="space-y-4 text-slate-300">
              <p className="text-base leading-relaxed">
                I'm a motivated Front-End Engineer currently in my LiftOff year at Launchpad, where I'm gaining hands-on experience in Front-End web development.
              </p>
              <p className="text-base leading-relaxed">
                What drives me is the challenge of turning ideas into clean, functional, and user-friendly web applications. Through Launchpad, I've been developing projects using tech languages like HTML, CSS, JavaScript, React and Next.js, while applying agile practices, version control (Git/GitHub), and problem-solving strategies that mirror real-world development environments.
              </p>
              <p className="text-base leading-relaxed">
                I'm continuously learning and refining my craft, not just to write code, but to write maintainable, scalable solutions that make a real impact. Looking ahead, I'm eager to grow into a Front-End developer role, where I can collaborate with teams, learn from experienced engineers, and contribute to projects that push my skills and creativity even further.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card-surface p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {/* Programming Languages */}
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
            <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
            <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
        
            {/* Frameworks & Libraries */}
            <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
            <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
            <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
            <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
            <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
        
            {/* Tools & Platforms */}
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
            <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code" />
            <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
            <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
            <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
        
            {/* Database & APIs */}
            <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
            <img src="https://img.shields.io/badge/REST_APIs-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="REST APIs" />
        
            {/* Design & Collaboration */}
            <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
            <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion" />
            <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" alt="Slack" />
            <img src="https://img.shields.io/badge/ChatGPT-10A37F?style=for-the-badge&logo=openai&logoColor=white" alt="ChatGPT" />
          </div>
        </div>
        </div>
        {/* Skills */}

        {/* Education & Experience */}
        <div className="card-surface p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Education & Experience</h2>
          <div className="space-y-10">
            {/* Launchpad */}
            <div className="relative border-l-4 border-blue-500 pl-8 hover:border-blue-400 transition-colors">
              <div className="absolute -left-3 top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-900"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <h3 className="text-xl font-semibold text-white">Launchpad - LiftOff Program</h3>
                <span className="text-sm text-slate-400 font-medium whitespace-nowrap">June 2025 - Present</span>
              </div>
              <p className="text-blue-400 italic mb-3 text-sm">Front-End Web Development</p>
              <p className="text-slate-300 leading-relaxed">
                Intensive hands-on training in front-end web development, focusing on modern frameworks and best practices. 
                Building real-world projects using React, Next.js, and responsive design principles while learning agile 
                methodologies, version control, and professional development workflows.
              </p>
            </div>

            {/* SLA Beeber */}
            <div className="relative border-l-4 border-green-500 pl-8 hover:border-green-400 transition-colors">
              <div className="absolute -left-3 top-0 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <h3 className="text-xl font-semibold text-white">Science Leadership Academy at Beeber</h3>
                <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Graduated 2024</span>
              </div>
              <p className="text-green-400 italic mb-3 text-sm">High School Diploma</p>
              <p className="text-slate-300 leading-relaxed">
                Graduated with a strong foundation in science, technology, and leadership. Developed critical thinking 
                and problem-solving skills that laid the groundwork for my journey into web development.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  )
}