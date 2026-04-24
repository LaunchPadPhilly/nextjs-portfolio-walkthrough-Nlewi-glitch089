import './globals.css'
import ClientParallaxWrapper from './components/ClientParallaxWrapper'
import ScrollReveal from './components/ScrollReveal'
import SideNavigation from './components/SideNavigation'
import DockedChatbot from './components/DockedChatbot'

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-root">
        {/* animated background layers (client) */}
        <ClientParallaxWrapper />

        {/* Dual panel layout */}
        <SideNavigation />

        <div className="main-content-wrapper">
          <div className="central-content">
            <main>
              {children}
            </main>
          </div>
          <DockedChatbot />
        </div>

        <ScrollReveal />
      </body>
    </html>
  )
}
