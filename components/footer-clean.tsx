import Link from "next/link"
import { LogoSVG } from "@/components/ui/logo-svg";

export function FooterClean() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <LogoSVG className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
              <span className="text-lg font-semibold text-foreground">Saturn Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building the data infrastructure for Physical AI.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.linkedin.com/company/saturnlabs/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-accent-foreground text-center mt-8 mb-4">
          We are hiring operations associates and research engineers in Bengaluru and San Francisco. Email to <a href="mailto:jobs@saturnlabs.ai" className="underline">jobs@saturnlabs.ai</a>
        </p>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Backed by Entrepreneurs First</p>
          <p className="text-sm text-muted-foreground mb-2">Silverlabs AI Inc, Delaware, 19901.</p>
        </div>
      </div>
    </footer>
  )
}
