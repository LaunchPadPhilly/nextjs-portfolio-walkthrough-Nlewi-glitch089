import Image from 'next/image'
export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4"></h2>
          <div className="space-y-4 text-gray-600">
             <div className="flex gap-8 items-center mb-8">
          {/* Profile photo */}
          <Image 
            src="/DSC_0692.jpg"
            alt="My photo"
            width={250}
            height={350}
            className="rounded-full"
          />
          </div>
          </div>
        </div>
        </div>
        {/* Skills */}

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 My Skills</h3>
          <ul className="text-blue-800 space-y-1">
            
            <li>•  I’m a tech enthusiast from Philadelphia and a graduate of ASPIRA Bilingual Charter Cyber School.
               I’m currently expanding my skills in React 19, Python, JavaScript, building computers and building robots, building a strong foundation for a future career in Cybersecurity.
                My goal is to develop secure, efficient systems that protect information, prevent threats, and contribute positively to the tech community.</li>
            <li>• HTML, CSS, JavaScript, Next.js, React</li>
            <li>• Education or experience timeline</li>
          </ul>
        </div>
      </div>
    
  )
}
