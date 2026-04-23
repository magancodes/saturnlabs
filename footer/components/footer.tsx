import Link from 'next/link'
import { SaturnLogo } from './saturn-logo'

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-md">
      {/* Glassmorphic Container */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <SaturnLogo />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-white/90 leading-none">SATURN</h3>
                <h3 className="text-sm font-semibold text-white/90 leading-none">LABS</h3>
              </div>
            </div>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Building the data infrastructure for Physical AI.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-3 gap-8 md:gap-12">
            
            {/* Hiring */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-wide text-white/40 font-medium">Hiring</p>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">Operations & research engineers</p>
                <p className="text-xs text-white/50 font-light">Bengaluru · SF</p>
                <Link 
                  href="mailto:jobs@saturnlabs.ai"
                  className="inline-block text-xs text-white/80 hover:text-white transition-colors font-light"
                >
                  jobs@saturnlabs.ai
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-wide text-white/40 font-medium">Company</p>
              <nav className="space-y-2">
                <Link href="#" className="block text-sm text-white/70 hover:text-white transition-colors font-light">
                  LinkedIn
                </Link>
                <Link href="#" className="block text-sm text-white/70 hover:text-white transition-colors font-light">
                  Privacy
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-wide text-white/40 font-medium">Legal</p>
              <div className="space-y-1">
                <p className="text-xs text-white/60 font-light">Backed by Entrepreneurs First</p>
                <p className="text-xs text-white/40 font-light">Silverlabs AI Inc</p>
                <p className="text-xs text-white/40 font-light">Delaware</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-16 pb-16">
          <p className="text-xs text-white/40 font-light">© 2026 Saturn Labs</p>
          <p className="text-xs text-white/40 font-light">Physical AI Infrastructure</p>
        </div>

        {/* Large Serif Typography */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif italic font-light text-white/80 leading-tight whitespace-nowrap" style={{ fontFamily: 'var(--font-serif)' }}>
          SATURN LABS
        </h1>
      </div>

      {/* Subtle accent line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    </footer>
  )
}
