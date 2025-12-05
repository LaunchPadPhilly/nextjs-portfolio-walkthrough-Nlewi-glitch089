export default function Contact() {
  return (
    <div className="max-w-[1100px] mx-auto my-10 p-10 text-foreground">
      <header className="mb-4">
        <h1 className="text-[clamp(1.8rem,4.8vw,3rem)] font-extrabold">Get In Touch</h1>
        <div className="text-[#00f0ff] font-semibold mt-2">I&apos;d love to connect and talk about new opportunities, collaborations, or anything tech-related. Reach out anytime through the channels below!</div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-9 items-start">
        <section>
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-6 rounded-[var(--radius)] text-[#b6b6c8]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              Contact
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>

            <div className="grid gap-4 mt-3">
              <div className="flex gap-4 items-start">
                <div className="text-2xl">📧</div>
                <div>
                  <div className="font-bold text-foreground">Email</div>
                  <div className="text-foreground">nlewi0089@launchpadphilly.org</div>
                  <div className="text-[#b6b6c8] mt-1 text-sm">(Best way to reach me!)</div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-2xl">🔗</div>
                <div>
                  <div className="font-bold text-foreground">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/nakerra-lewis-027827318/" target="_blank" rel="noreferrer" className="text-[#00f0ff] hover:underline">linkedin.com/in/nakerra-lewis-027827318</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-2xl">💻</div>
                <div>
                  <div className="font-bold text-foreground">GitHub</div>
                  <a href="https://github.com/Nlewi-glitch089" target="_blank" rel="noreferrer" className="text-[#00f0ff] hover:underline">github.com/Nlewi-glitch089</a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-3 my-3" />

          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] p-6 rounded-[var(--radius)] text-[#b6b6c8]" />
        </section>

        <aside className="grid gap-3">
          <div className="p-[18px] rounded-[var(--radius)] bg-gradient-to-br from-[rgba(155,92,255,0.04)] to-[rgba(0,240,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-6px] hover:scale-[1.01] hover:shadow-[0_30px_86px_rgba(161,75,255,0.14),0_10px_40px_rgba(0,240,255,0.06)] hover:border-[rgba(161,75,255,0.14)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              Availability
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-[1.03rem] text-foreground leading-[1.72] font-medium">Open to freelance and collaborative projects — best reached by email. Typical response time: 1–3 business days.</p>
          </div>

          <div className="p-[18px] rounded-[var(--radius)] bg-gradient-to-br from-[rgba(155,92,255,0.04)] to-[rgba(0,240,255,0.02)] border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] transition-all duration-260 hover:translate-y-[-6px] hover:scale-[1.01] hover:shadow-[0_30px_86px_rgba(161,75,255,0.14),0_10px_40px_rgba(0,240,255,0.06)] hover:border-[rgba(161,75,255,0.14)]">
            <div className="font-extrabold text-[#00f0ff] mb-3 text-lg tracking-wide relative pb-2">
              Why Connect?
              <span className="absolute left-0 bottom-0 w-16 h-1 rounded bg-gradient-to-r from-[#ff3bd6] to-[#a14bff]" />
            </div>
            <p className="text-[1.03rem] text-foreground leading-[1.72] font-medium">If you have an idea for a project, a collaboration, or want feedback on a prototype, I&apos;d love to hear from you.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
