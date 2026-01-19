'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Coffee } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ContactSection() {
  const { t } = useTranslation()

  const contactLinks = [
    {
      icon: Github,
      label: t.contact.github,
      href: t.contact.links.github,
      external: true,
      color: 'hover:bg-gray-800 hover:text-white hover:border-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:border-gray-100'
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      href: t.contact.links.linkedin,
      external: true,
      color: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] dark:hover:bg-[#0077b5] dark:hover:text-white dark:hover:border-[#0077b5]'
    },
    {
      icon: Mail,
      label: t.contact.email,
      href: t.contact.links.email,
      external: false,
      color: 'hover:bg-orange-600 hover:text-white hover:border-orange-600 dark:hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500'
    },
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration with pulse */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative coffee icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              whileHover={{
                rotate: [0, -5, 5, -5, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
              className="text-4xl cursor-pointer relative"
            >
              ☕
              {/* Steam particles */}
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs opacity-50"
                animate={{
                  y: [-5, -20],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                ~
              </motion.div>
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs opacity-50"
                animate={{
                  y: [-5, -20],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              >
                ~
              </motion.div>
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground mb-12">{t.contact.subtitle}</p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "w-full h-auto py-6 flex-col gap-2 lofi-glow",
                      link.color
                    )}
                  >
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <motion.div
                        animate={index === 1 ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  </Button>
                </motion.div>
              )
            })}
          </div>

          {/* Friendly message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-muted-foreground handwritten text-xl"
          >
            I'm always happy to chat about code, coffee, or anything in between! ☕
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
