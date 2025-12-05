import Link from 'next/link'
import TitleEffect from './components/TitleEffect'

export default function Home() {
  return (
    <div className="max-w-[1100px] mx-auto my-16 p-8">
      <div className="grid lg:grid-cols-[1fr_360px] gap-9 items-start">
        <section>
          <div>
            <TitleEffect>
              <h1 className="text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.02] m-0 text-foreground font-extrabold tracking-[-0.02em] drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)] animate-slide-up-fade">Nakerra Lewis</h1>
            </TitleEffect>
          </div>

          <div className="text-[#00f0ff] font-semibold text-lg mt-2 animate-slide-up-fade-lg">Creative Developer Building Meaningful Digital Experiences</div>

          <div className="mt-4 bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-5 rounded-[var(--radius)] text-[#b6b6c8] hover:translate-y-[-8px] hover:scale-[1.01] transition-all duration-260 animate-slide-up-fade-xl">
            <p className="text-foreground text-[1.03rem]">
              I design and prototype interactive apps that encourage people to connect, explore, and try new things. I&apos;m passionate about social-driven technology — from playful game features to engaging UI that supports real collaboration and community.
            </p>

            <div className="mt-3 text-[#b6b6c8]">
              <strong>Focused on:</strong> UI/UX Design · Front-End Development · Interactive Media
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
              <button className="appearance-none bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground px-4 py-2 rounded-full font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] cursor-default hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">🎮 Designing creative tools for social connection</button>
              <button className="appearance-none bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground px-4 py-2 rounded-full font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] cursor-default hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">🧩 Turning ideas into interactive prototypes</button>
              <button className="appearance-none bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground px-4 py-2 rounded-full font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] cursor-default hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">🌱 Always learning new ways to enhance user experience</button>
            </div>
          </div>
        </section>

        <aside>
          <div className="p-6 rounded-[var(--radius)] bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] grid gap-3 text-center self-start min-h-[220px] hover:translate-y-[-8px] hover:scale-[1.01] transition-all duration-260">
            <div className="text-[#ff3bd6] font-bold">Featured</div>
            <div className="font-bold text-foreground text-[1.05rem]">Creator + Developer</div>
            <p className="mt-2 text-[#b6b6c8] text-[0.95rem]">Focused on accessible interactions and delightful micro-interactions. Currently exploring real-time collaboration and generative UI patterns.</p>
          </div>

          <div className="mt-4 p-4 rounded-[var(--radius)] bg-gradient-to-br from-[rgba(155,92,255,0.04)] to-[rgba(0,240,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] hover:translate-y-[-6px] hover:scale-[1.01] transition-all duration-260">
            <div className="font-extrabold text-[#00f0ff] mb-2">Featured Project</div>
            <p className="text-[#b6b6c8] text-[0.95rem]">PlayerLobby — an early prototype for coordinating local and online gaming hangouts with presence awareness and quick invites. Click to view the project or explore more on the Projects page.</p>
            <Link href="/projects" className="inline-block mt-3 px-3 py-2 rounded-md bg-gradient-to-r from-[#00f0ff] to-[#ff3bd6] text-[#0b0b0b] font-extrabold hover:translate-y-[-4px] hover:scale-[1.02] transition-all duration-200">See Projects</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
