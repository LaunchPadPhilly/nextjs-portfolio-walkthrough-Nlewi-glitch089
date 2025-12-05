import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-[1100px] mx-auto my-10 p-10 grid gap-8 text-foreground">
      <header className="grid gap-2">
        <div className="flex items-center gap-5">
          <div className="relative w-[clamp(110px,12vw,140px)] h-[clamp(110px,12vw,140px)] rounded-full p-0 inline-flex items-center justify-center overflow-visible transition-all duration-240 ease-out hover:translate-y-[-4px] hover:scale-[1.02] shadow-[0_6px_18px_rgba(161,75,255,0.06),0_2px_10px_rgba(0,240,255,0.04)]">
            {/* Decorative colored ring using pseudo-element styles */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff3bd6] via-[#a14bff] to-[#00f0ff] z-[1]" style={{
              width: 'calc(100% + 6px)',
              height: 'calc(100% + 6px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 rounded-full animate-pulse-ring z-0" style={{
              width: 'calc(100% + 12px)',
              height: 'calc(100% + 12px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(161,75,255,0.12), rgba(0,240,255,0.06))',
              filter: 'blur(6px)',
              opacity: '0.22'
            }} />
            <Image
              className="w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full block border-0 relative z-[3] object-cover"
              src="/download.jpg"
              alt="Nakerra Lewis"
              width={120}
              height={120}
            />
          </div>
          <div>
            <h1 className="text-[clamp(1.8rem,4.8vw,3rem)] font-extrabold m-0">About Me</h1>
            <div className="text-[#00f0ff] font-semibold text-lg">Designing futures through creativity and code</div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-9 items-start">
        <section>
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-6 rounded-[var(--radius)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-8px] hover:scale-[1.01] hover:shadow-[0_36px_100px_rgba(161,75,255,0.16),0_10px_48px_rgba(161,75,255,0.08)] hover:border-[rgba(161,75,255,0.18)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              Who I Am
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-foreground text-[1.03rem] leading-[1.72] font-medium">
              I&apos;m Nakerra Lewis, a hands-on creative developer with a growing focus in game design, web development, and emerging technology. I love building digital experiences that feel playful, futuristic, and alive — the type of projects that encourage people to explore and connect with each other.
            </p>
          </div>

          <div className="h-3 my-3" />

          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-6 rounded-[var(--radius)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-8px] hover:scale-[1.01] hover:shadow-[0_36px_100px_rgba(161,75,255,0.16),0_10px_48px_rgba(161,75,255,0.08)] hover:border-[rgba(161,75,255,0.18)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              My Journey
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-foreground text-[1.03rem] leading-[1.72] font-medium">
              Over the past year, I&apos;ve been expanding my skills in real-world environments — including designing an app concept called Lemon-Aid to help teens build confidence and make new friends. I&apos;m currently working on PlayerLobby, a social platform for planning gaming hangouts, while leveling up my UI design and coding abilities through build-first learning.
            </p>
          </div>

          <div className="h-3 my-3" />

          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-6 rounded-[var(--radius)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-8px] hover:scale-[1.01] hover:shadow-[0_36px_100px_rgba(161,75,255,0.16),0_10px_48px_rgba(161,75,255,0.08)] hover:border-[rgba(161,75,255,0.18)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              What I Work With
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <ul className="flex flex-wrap gap-3 mt-2" aria-label="skills">
              <li><span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">JavaScript + Next.js</span></li>
              <li><span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">CSS + modern UI styling techniques</span></li>
              <li><span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">Figma: wireframes, interface layouts</span></li>
              <li><span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-[rgba(0,240,255,0.10)] to-[rgba(161,75,255,0.06)] text-foreground font-bold text-[0.96rem] border border-[rgba(161,75,255,0.10)] hover:translate-y-[-6px] hover:scale-[1.04] transition-all duration-200">UX research + interaction planning</span></li>
            </ul>
          </div>
        </section>

        <aside className="grid gap-3">
          <div className="p-[18px] rounded-[var(--radius)] bg-gradient-to-br from-[rgba(155,92,255,0.04)] to-[rgba(0,240,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-6px] hover:scale-[1.01] hover:shadow-[0_30px_86px_rgba(161,75,255,0.14),0_10px_40px_rgba(0,240,255,0.06)] hover:border-[rgba(161,75,255,0.14)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              Beyond the Screen
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-[1.03rem] text-foreground leading-[1.72] font-medium">
              I love story-rich game universes, interactive media, and anything with a neon, cosmic, or sci-fi feel. My goal is to build digital spaces that feel like an adventure — where users feel welcome and excited to dive in.
            </p>
          </div>

          <div className="p-[18px] rounded-[var(--radius)] bg-gradient-to-br from-[rgba(155,92,255,0.04)] to-[rgba(0,240,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-6px] hover:scale-[1.01] hover:shadow-[0_30px_86px_rgba(161,75,255,0.14),0_10px_40px_rgba(0,240,255,0.06)] hover:border-[rgba(161,75,255,0.14)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              My Purpose
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-[1.03rem] text-foreground leading-[1.72] font-medium">
              I create with intention: to make technology feel bold, inclusive, and inspiring. Every project is a chance to help someone take a step toward something new.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
