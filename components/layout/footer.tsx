'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/use-translation'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="handwritten text-lg">
              {t.footer.madeWith} ☕ {t.footer.love}
            </p>
            <p className="text-xs mt-1">© 2024 Felipe Marques</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="lofi-glow">
              <Link
                href={t.contact.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="lofi-glow">
              <Link
                href={t.contact.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="lofi-glow">
              <Link
                href={t.contact.links.email}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
