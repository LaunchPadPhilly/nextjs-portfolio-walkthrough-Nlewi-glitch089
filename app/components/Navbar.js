import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Your name or logo */}
          
          
          {/* Navigation links */}
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            </div>

            <div className="flex gap-6">
            <Link href="/about" className="hover:text-blue-400">
              About
            </Link>
            </div>

            <div className="flex gap-6">
            <Link href="/projects" className="hover:text-blue-400">
              Projects
            </Link>
            </div>
            <div className="flex gap-6">
            <Link href="/contact" className="hover:text-blue-400">
              Contact
            </Link>
            </div>
          </div>
        </div>
    </nav>
  )
}