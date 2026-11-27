import { RegisterForm } from '@/components/auth/register-form'
import { motion } from 'motion/react'
import { Reveal, SectionLabel } from '@/components/motion/reveal'

export const metadata = {
  title: 'Join GDG on Campus RVCE',
  description: 'Apply for membership to join the Google Developer Group on Campus at RV College of Engineering. Access exclusive events, workshops, and community resources.'
}

export default function JoinPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-background"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
        <Reveal y={20} delay={0.1}>
          <header className="mb-10 text-center">
            <SectionLabel index="01">Membership</SectionLabel>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Join GDG on Campus RVCE
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Become part of a community that builds, learns, and grows together. Fill out the form below to apply for membership.
            </p>
          </header>
        </Reveal>

        <Reveal y={20} delay={0.15}>
          <RegisterForm />
        </Reveal>
      </div>
    </motion.div>
  )
}