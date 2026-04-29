"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { useCal } from "@/hooks/use-cal"
import { LogoSVG } from "@/components/ui/logo-svg";
import * as Dialog from "@radix-ui/react-dialog"

export function NavbarClean() {
  const { handleCalClick } = useCal()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoSVG className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
          <span className="text-lg font-semibold text-foreground">Saturn Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/samples"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Samples
          </Link>
          <Link
            href="/research"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Research
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden md:flex bg-transparent border-border"
            onClick={handleCalClick}
          >
            Connect with us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
              <Dialog.Content className="fixed right-3 top-3 z-50 w-[calc(100vw-1.5rem)] max-w-sm rounded-xl border bg-background p-4 shadow-lg">
                <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LogoSVG className="h-7 w-7" />
                    <span className="text-base font-semibold text-foreground">Saturn Labs</span>
                  </div>
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/samples"
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Samples
                  </Link>
                  <Link
                    href="/research"
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Research
                  </Link>

                  <Button
                    variant="outline"
                    className="mt-2 justify-between bg-transparent border-border"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleCalClick()
                    }}
                  >
                    Connect with us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
