import Link from 'next/link'

export default function Contact() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-center mb-16">Get In Touch</h1>
        <div className="card-surface p-10 md:p-12">
          <p className="text-base md:text-lg text-slate-300 mb-10 text-center leading-relaxed">I'm always open to discussing new opportunities, collaborations, or just connecting. Reach out through any of the channels below.</p>
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-6 p-6 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/50 hover:border-slate-600 group">
              <div className="text-4xl group-hover:scale-110 transition-transform">📧</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-400 mb-1">Email</p>
                <p className="text-base text-slate-300">jmiester765@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/50 hover:border-slate-600 group">
              <div className="text-4xl group-hover:scale-110 transition-transform">🔗</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-400 mb-1">LinkedIn</p>
                <Link href="https://www.linkedin.com/in/jaylen-marshall-016325374/" className="text-base text-slate-300 hover:text-blue-400 font-medium transition">Jaylen Marshall</Link>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/50 hover:border-slate-600 group">
              <div className="text-4xl group-hover:scale-110 transition-transform">💻</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-400 mb-1">GitHub</p>
                <Link href="https://github.com/JMiester5M" className="text-base text-slate-300 hover:text-blue-400 font-medium transition">JMiester5M</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
