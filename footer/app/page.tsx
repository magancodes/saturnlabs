import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-zinc-950">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="text-center max-w-3xl">
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
            SATURN LABS
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Building the data infrastructure for Physical AI.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
