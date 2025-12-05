export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[rgba(255,255,255,0.03)] py-7 mt-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.01),transparent)]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-3">
        <div className="text-[color:var(--muted)] text-sm text-center">© {year} Nakerra — All rights reserved.</div>
      </div>
    </footer>
  )
}
