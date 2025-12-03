export default function Projects() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">My Projects</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Project Card Example - Duplicate this 3 times */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <p className="text-white font-bold text-xl">Project Image Here</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Project Title</h3>
              <p className="text-gray-600 mb-4">
                Write a brief description of your project here.
              </p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-200 px-3 py-1 rounded">Tech 1</span>
                <span className="text-sm bg-gray-200 px-3 py-1 rounded">Tech 2</span>
              </div>
            </div>
          </div>

          {/* TODO: Add 2 more project cards */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
  {/* Project image */}
  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
    <p className="text-white font-bold">Project Screenshot</p>
  </div>
  
  {/* Project details */}
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-2">Project Name</h3>
    <p className="text-gray-600 mb-4">
      Brief description of what this project does.
    </p>
    <div className="flex gap-2">
      <span className="text-sm bg-gray-200 px-3 py-1 rounded">HTML</span>
      <span className="text-sm bg-gray-200 px-3 py-1 rounded">CSS</span>
    </div>
  </div>
</div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Past school projects</li>
            <li>• Personal coding projects</li>
            <li>• Design work or creative projects</li>
            <li>• Future projects you want to build (coming soon!)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
