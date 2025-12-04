import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-slate-900/70 border-b border-slate-700/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-lg font-semibold gradient-text">
            Jaylen Marshall
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition relative group"
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
